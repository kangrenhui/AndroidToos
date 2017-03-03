package com.tool.teddy.ui;

import android.content.Context;
import android.content.res.TypedArray;
import android.os.Build;
import android.support.annotation.RequiresApi;
import android.util.AttributeSet;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

/**
 * Created by teddy on 2017/2/23.
 */

public class MWebView extends WebView{
    private String url;

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    public MWebView(Context context, AttributeSet attrs) {
        super(context, attrs);

        TypedArray parms = context.obtainStyledAttributes(attrs,R.styleable.MWebView);
        url = parms.getString(R.styleable.MWebView_url);

        init();
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    private void init(){
        WebSettings settings = this.getSettings();

        settings.setDomStorageEnabled(true);
        settings.setUseWideViewPort(true);//关键点

        settings.setJavaScriptEnabled(true);
        settings.setJavaScriptCanOpenWindowsAutomatically(true);

        settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        settings.setDisplayZoomControls(false);
        settings.setAllowFileAccess(true); // 允许访问文件
        settings.setBuiltInZoomControls(true); // 设置显示缩放按钮
        settings.setSupportZoom(true); // 支持缩放
        settings.setLoadWithOverviewMode(true);
        //跨域
        settings.setAllowUniversalAccessFromFileURLs(true);
        Log.i("url",url);
        this.loadUrl(url);
    }
}
