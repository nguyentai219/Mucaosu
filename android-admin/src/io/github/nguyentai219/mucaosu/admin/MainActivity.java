package io.github.nguyentai219.mucaosu.admin;

import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/**
 * App quản trị Mủ Cao Su: mở công cụ quản trị (assets/admin.html, đóng gói sẵn trong APK — KHÔNG tải từ
 * GitHub vì file chứa khoá bí mật tính mã gia hạn). Nạp bằng loadDataWithBaseURL với 1 địa chỉ https riêng
 * để trang có nguồn gốc cố định: localStorage (phiên đăng nhập Supabase) được giữ giữa các lần mở app và
 * gọi Supabase không bị chặn như khi mở file:// trực tiếp.
 */
public class MainActivity extends Activity {
    private static final String BASE_URL = "https://mucaosu-admin.app/";
    private WebView web;

    /** Sao chép vào bộ nhớ tạm của Android (navigator.clipboard trong WebView thường bị từ chối). */
    public class Clip {
        @JavascriptInterface
        public void copy(String text) {
            ClipboardManager cm = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
            if (cm != null) cm.setPrimaryClip(ClipData.newPlainText("Mủ Cao Su", text));
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        setContentView(web);
        WebSettings ws = web.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setDatabaseEnabled(true);
        ws.setTextZoom(100);
        web.addJavascriptInterface(new Clip(), "AndroidClip");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                view.evaluateJavascript(
                    "try{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:function(t){"
                    + "AndroidClip.copy(String(t));return Promise.resolve();}}});}catch(e){}", null);
            }
            // Liên kết ra ngoài (VD trang Supabase) mở bằng trình duyệt, không mở trong app
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url == null || url.startsWith(BASE_URL)) return false;
                Uri u = Uri.parse(url);
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception e) { }
                return true;
            }
        });
        if (savedInstanceState != null) {
            web.restoreState(savedInstanceState);
        } else {
            web.loadDataWithBaseURL(BASE_URL, readAsset("admin.html"), "text/html", "UTF-8", null);
        }
    }

    private String readAsset(String name) {
        try {
            InputStream in = getAssets().open(name);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int n;
            while ((n = in.read(buf)) > 0) out.write(buf, 0, n);
            in.close();
            return out.toString("UTF-8");
        } catch (Exception e) {
            return "<p>Không đọc được công cụ quản trị: " + e + "</p>";
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack(); else super.onBackPressed();
    }
}
