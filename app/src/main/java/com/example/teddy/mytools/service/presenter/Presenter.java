package com.example.teddy.mytools.service.presenter;

import android.content.Intent;

import com.example.teddy.mytools.service.view.View;

/**
 * Created by teddy on 2017/3/6.
 */

public interface Presenter {
    void onCreate();
    void onStart();
    void onStop();
    void pause();
    void attachView(View view);
    void attachIncomingIntent(Intent intent);
}
