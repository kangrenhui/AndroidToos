package com.example.teddy.mytools.service.presenter;

import android.content.Context;
import android.content.Intent;

import com.example.teddy.mytools.service.manager.DataManager;
import com.example.teddy.mytools.service.view.ApkVersionView;
import com.example.teddy.mytools.service.view.View;
import com.google.gson.JsonObject;

import okhttp3.ResponseBody;
import rx.Observer;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;
import rx.subscriptions.CompositeSubscription;

/**
 * Created by teddy on 2017/3/6.
 */

public class ApkVersionPresenter implements Presenter{
    private DataManager manager;
    private CompositeSubscription mCompositeSubscription;
    private Context mContext;
    private ApkVersionView mApkVersionView;
    private JsonObject mApkVersionBean;

    public ApkVersionPresenter (Context mContext){
        this.mContext = mContext;
    }

    @Override
    public void onCreate() {
        manager = new DataManager(mContext);
        // 创建一个订阅关系
        mCompositeSubscription = new CompositeSubscription();
    }

    @Override
    public void onStart() {

    }

    @Override
    public void onStop() {
        if (mCompositeSubscription.hasSubscriptions()){
            mCompositeSubscription.unsubscribe();
        }
    }

    @Override
    public void pause() {

    }

    @Override
    public void attachView(View view) {
        mApkVersionView = (ApkVersionView)view;
    }

    @Override
    public void attachIncomingIntent(Intent intent) {

    }

    public void getApkVersion(){
        mCompositeSubscription.add(manager.getApkVersion().
                subscribeOn(Schedulers.io()).
                observeOn(AndroidSchedulers.mainThread()).
                subscribe(new Observer<JsonObject>() {
            @Override
            public void onCompleted() {
                if (mApkVersionBean != null){
                    mApkVersionView.onSuccess(mApkVersionBean);
                }
            }

            @Override
            public void onError(Throwable e) {
                e.printStackTrace();
                mApkVersionView.onError("apkversion网络请求失败");
            }

            @Override
            public void onNext(JsonObject jsonObject) {
                mApkVersionBean = jsonObject;
            }
        }));
    }

    public void downLoadApk(){
        mCompositeSubscription.add(manager.downLoadApk().
                subscribeOn(Schedulers.io()).
                observeOn(AndroidSchedulers.mainThread()).
                subscribe(new Observer<ResponseBody>() {
                    @Override
                    public void onCompleted() {
                        if (mApkVersionBean != null){
                            mApkVersionView.onSuccess(mApkVersionBean);
                        }
                    }

                    @Override
                    public void onError(Throwable e) {
                        e.printStackTrace();
                        mApkVersionView.onError("apkversion网络请求失败");
                    }

                    @Override
                    public void onNext(ResponseBody responseBody) {
                        mApkVersionView.onDownload(responseBody);
                    }
                }));
    }
}
