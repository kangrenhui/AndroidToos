package com.example.teddy.mytools.service.manager;

import android.content.Context;

import com.example.teddy.mytools.service.RetrofitHelper;
import com.example.teddy.mytools.service.RetrofitService;
import com.google.gson.JsonObject;

import okhttp3.ResponseBody;
import rx.Observable;

/**
 * Created by teddy on 2017/3/6.
 */

public class DataManager {
    private RetrofitService mRetrofitService;
    public DataManager(Context context){
        this.mRetrofitService = RetrofitHelper.getInstance(context).getServer();
    }
    public Observable<JsonObject> getApkVersion(){
        return mRetrofitService.getApkVersion();
    }
    public Observable<ResponseBody> downLoadApk(){
        return mRetrofitService.downloadApk();
    }
}
