package com.example.teddy.mytools.service.view;

import com.google.gson.JsonObject;

import okhttp3.ResponseBody;

/**
 * Created by teddy on 2017/3/6.
 */

public interface ApkVersionView extends View{
    void onSuccess(JsonObject versionJson);
    void onDownload(ResponseBody body);
    void onError(String result);
}
