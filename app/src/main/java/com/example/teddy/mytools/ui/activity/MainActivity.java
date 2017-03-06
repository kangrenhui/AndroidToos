package com.example.teddy.mytools.ui.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import com.example.teddy.mytools.R;
import com.example.teddy.mytools.service.presenter.ApkVersionPresenter;
import com.example.teddy.mytools.service.view.ApkVersionView;
import com.google.gson.JsonObject;
import com.tool.teddy.control.BaseActivity;
import com.tool.teddy.ui.MenuBarView;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import okhttp3.ResponseBody;

public class MainActivity extends BaseActivity {
    private MenuBarView menuBarView;
    private ApkVersionPresenter mApkVersionPresenter = new ApkVersionPresenter(this);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        menuBarView = (MenuBarView) findViewById(R.id.fist_menu_bar);
        menuBarView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mApkVersionPresenter.downLoadApk();
            }
        });

        mApkVersionPresenter.onCreate();
        mApkVersionPresenter.attachView(mApkVersionView);
    }

    private ApkVersionView mApkVersionView = new ApkVersionView() {
        @Override
        public void onSuccess(JsonObject versionJson) {
            Toast.makeText(mContext,versionJson.toString(),Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onDownload(ResponseBody body) {
            try {
                // todo change the file location/name according to your needs
                File futureStudioIconFile = new File(getExternalFilesDir(null) + File.separator + "Future Studio Icon.png");

                InputStream inputStream = null;
                OutputStream outputStream = null;

                try {
                    byte[] fileReader = new byte[4096];

                    long fileSize = body.contentLength();
                    long fileSizeDownloaded = 0;

                    inputStream = body.byteStream();
                    outputStream = new FileOutputStream(futureStudioIconFile);

                    while (true) {
                        int read = inputStream.read(fileReader);

                        if (read == -1) {
                            break;
                        }

                        outputStream.write(fileReader, 0, read);

                        fileSizeDownloaded += read;


                    }

                    outputStream.flush();


                } catch (IOException e) {

                } finally {
                    if (inputStream != null) {
                        inputStream.close();
                    }

                    if (outputStream != null) {
                        outputStream.close();
                    }
                }
            } catch (IOException e) {

            }
        }

        @Override
        public void onError(String result) {
            Toast.makeText(mContext,result,Toast.LENGTH_SHORT).show();
        }
    };

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mApkVersionPresenter.onStop();
    }
}
