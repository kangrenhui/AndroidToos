package com.example.teddy.mytools.ui.activity;

import android.os.Bundle;
import android.util.Log;

import com.example.teddy.mytools.R;
import com.example.teddy.mytools.service.RetrofitTest;
import com.example.teddy.mytools.service.entity.BookModel;
import com.google.gson.GsonBuilder;
import com.tool.teddy.control.BaseActivity;

import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;
import rx.Observable;
import rx.Observer;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class MainActivity extends BaseActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Retrofit retrofit = new Retrofit.Builder().
                baseUrl("https://api.douban.com/v2/").
                addConverterFactory(GsonConverterFactory.create(new GsonBuilder().create())).
                addCallAdapterFactory(RxJavaCallAdapterFactory.create()).build();

        RetrofitTest testService = retrofit.create(RetrofitTest.class);

        Observable<BookModel> testObservable = testService.getSearchBook("金瓶梅","1");
        testObservable.subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()).subscribe(new Observer<BookModel>() {
            @Override
            public void onCompleted() {

            }

            @Override
            public void onError(Throwable e) {

            }

            @Override
            public void onNext(BookModel bookModel) {
                Log.i("abc",bookModel.toString());
                Log.i("abc",bookModel.toString());
                Log.i("abc",bookModel.toString());
            }
        });

    }
}
