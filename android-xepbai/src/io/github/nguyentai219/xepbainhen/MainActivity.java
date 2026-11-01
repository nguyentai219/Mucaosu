package io.github.nguyentai219.xepbainhen;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;

/**
 * Xếp Bài Nhện: game chạy hoàn toàn trong máy (assets/index.html), không cần mạng.
 * Nạp bằng loadDataWithBaseURL với 1 địa chỉ cố định để localStorage (ván đang chơi, cài đặt, thống kê)
 * được giữ nguyên giữa các lần mở app.
 */
public class MainActivity extends Activity {
    private static final String BASE_URL = "https://xepbainhen.app/";
    private WebView web;

    public class Bridge {
        @JavascriptInterface
        public void exit() { runOnUiThread(new Runnable() { public void run() { finish(); } }); }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        web = new WebView(this);
        web.setBackgroundColor(0xFF1A5A33);
        setContentView(web);
        hideBars();
        WebSettings ws = web.getSettings();
        ws.setJavaScriptEnabled(true);
        ws.setDomStorageEnabled(true);
        ws.setDatabaseEnabled(true);
        ws.setTextZoom(100);
        ws.setMediaPlaybackRequiresUserGesture(false);
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        web.setVerticalScrollBarEnabled(false);
        web.setHorizontalScrollBarEnabled(false);
        web.addJavascriptInterface(new Bridge(), "Android");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) { return true; } // không mở trang nào khác
        });
        web.loadDataWithBaseURL(BASE_URL, readAsset("index.html"), "text/html", "UTF-8", null);
    }

    /** Ẩn thanh trạng thái + thanh điều hướng (vuốt từ mép để hiện tạm). */
    private void hideBars() {
        if (Build.VERSION.SDK_INT >= 19) {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) hideBars();
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
            return "<p>Không đọc được game: " + e + "</p>";
        }
    }

    @Override
    protected void onPause() {
        if (web != null) { web.evaluateJavascript("window.onAppPause&&onAppPause()", null); web.onPause(); }
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (web != null) { web.onResume(); web.evaluateJavascript("window.onAppResume&&onAppResume()", null); }
        hideBars();
    }

    /** Nút Quay lại: game tự xử lý (đóng bảng đang mở / hỏi thoát), chỉ thoát khi game không xử lý. */
    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.onAndroidBack&&onAndroidBack())?'1':'0'", new ValueCallback<String>() {
            @Override
            public void onReceiveValue(String v) {
                if (v == null || !v.contains("1")) finish();
            }
        });
    }
}
