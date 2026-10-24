#!/bin/sh
# Đóng gói APK "Quản trị Mủ Cao Su" (WebView nạp công cụ quản trị đóng gói sẵn).
#   apt-get install android-sdk-platform-23 aapt apksigner zipalign dalvik-exchange
# Cách dùng: ADMIN_HTML=/đường/dẫn/cong-cu-tinh-ma-MG1.html KEYSTORE=... KS_PASS=... ./build.sh
# ⚠️ File công cụ quản trị chứa khoá bí mật tính mã gia hạn — KHÔNG đưa vào repo, KHÔNG phát hành APK
#    này công khai (ai có APK đều giải nén đọc được).
set -e
cd "$(dirname "$0")"
SDK_JAR=/usr/lib/android-sdk/platforms/android-23/android.jar
: "${ADMIN_HTML:?Cần ADMIN_HTML}" "${KEYSTORE:?Cần KEYSTORE}" "${KS_PASS:?Cần KS_PASS}"
rm -rf build && mkdir -p build/gen build/classes build/assets
cp "$ADMIN_HTML" build/assets/admin.html
aapt package -f -m -J build/gen -M AndroidManifest.xml -S res -A build/assets -I "$SDK_JAR" -F build/app.unsigned.apk
javac -nowarn -source 8 -target 8 -bootclasspath "$SDK_JAR" -d build/classes \
  $(find src build/gen -name '*.java')
dalvik-exchange --dex --output=build/classes.dex build/classes
(cd build && aapt add app.unsigned.apk classes.dex >/dev/null)
zipalign -f 4 build/app.unsigned.apk build/app.aligned.apk
apksigner sign --ks "$KEYSTORE" --ks-pass "pass:$KS_PASS" --out build/QuanTriMuCaoSu.apk build/app.aligned.apk
apksigner verify build/QuanTriMuCaoSu.apk && echo "OK: build/QuanTriMuCaoSu.apk"
