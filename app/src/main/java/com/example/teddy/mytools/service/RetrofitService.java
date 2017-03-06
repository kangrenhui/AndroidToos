package com.example.teddy.mytools.service;

import com.google.gson.JsonObject;

import okhttp3.ResponseBody;
import retrofit2.http.GET;
import retrofit2.http.POST;
import rx.Observable;

/**
 * Created by teddy on 2017/3/3.
 */

public interface RetrofitService {
    //需要访问的网址
    /**
     * base url 是 https://api.douban.com/v2/
     * 接口部分字段是book/search
     * 参数是?q=%E9%87%91%E7%93%B6%E6%A2%85&tag=&start=0&count=1
     */

    /**
     * GET -- 查找资源（查）
     * POST -- 修改资源（改）
     * PUT -- 上传文件（增）
     * DELETE -- 删除文件（删）
     * HEAD -- 只请求页面的首部
     */

    /**
     * @Query（get请求）
     * @GET("book/search")
     * Call<Book> getSearchBook(@Query("q") String name);
     *
     *
     * @QueryMap(GET请求 参数用map去装)
     * @GET("book/search")
     * Call<Book> getSearchBook(@QueryMap Map<String, String> options);
     *
     * @Path(GET请求)
     * @GET("group/{id}/users" 替换URL中的某一个字段)
     * Call<Book> groupList(@Path("id") int groupId);
     *
     * @Body(POST请求):
     * 把某个对象作为HTTP的请求体
     * @POST("users/new")
     * Call<User> createUser(@Body User user);
     *
     * @Field(POST请求)
     * 用于传输表单数据的网络请求
     * @FormUrlEncoded
     * @POST("user/edit")
     * Call<User> updateUser(@Field("first_name") String first, @Field("last_name") String last);
     *
     * @Header/@Headers(POST请求):
     * 添加请求的头部
     * @GET("user")
     * Call<User> getUser(@Header("Authorization") String authorization)
     * @Headers({
     * "Accept: application/vnd.github.v3.full+json",
     * "User-Agent: Retrofit-Sample-App"
     * })
     @GET("user")
     Call<User> getUser()
     */
    @POST("data/GetAppVersion")
    Observable<JsonObject> getApkVersion();

    @GET("49d590d656fc7d93/baiduwangpan_506.apk")
    Observable<ResponseBody> downloadApk();
}
