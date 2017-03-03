package com.tool.teddy.ui;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.support.v7.widget.LinearLayoutCompat;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * Created by teddy on 2017/2/24.
 */

public class MenuBarView extends LinearLayout{
    private ImageView img;
    private TextView nameTv;
    private String mName;
    private String pic;


    public MenuBarView(Context context, AttributeSet attrs) {
        super(context, attrs);

        TypedArray parms = context.obtainStyledAttributes(attrs,R.styleable.MenuBarView);
        mName = parms.getString(R.styleable.MenuBarView_name);
        pic = parms.getString(R.styleable.MenuBarView_picture);

        init(context);
    }

    private void init(Context context){
        setOrientation(VERTICAL);
        setGravity(Gravity.CENTER);
        setPadding(0,30,0,30);
        setClickable(true);

        int imgWidth = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 100, this.getResources().getDisplayMetrics());
        int imgHeight = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 100, this.getResources().getDisplayMetrics());

        img = new ImageView(context);

        int id = context.getResources().getIdentifier(getImgId(pic), "drawable", context.getPackageName());
        img.setBackgroundResource(id);
        nameTv = new TextView(context);
        nameTv.setText(mName);
        nameTv.setTextColor(Color.BLACK);

        LinearLayoutCompat.LayoutParams imgParams = new LinearLayoutCompat.LayoutParams(imgWidth,imgHeight);
        LinearLayoutCompat.LayoutParams nameParams = new LinearLayoutCompat.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);

        addView(img,imgParams);
        addView(nameTv,nameParams);
    }

    private String getImgId(String picPath){
        String[] temp = picPath.split("/");
        String temp2 = temp[temp.length - 1];
        String[] temp1 = temp2.split("\\.");

        return temp1[0];
    }

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (event.getAction() == MotionEvent.ACTION_DOWN){
            MenuBarView.this.setAlpha((float)0.3);
        }

        if (event.getAction() == MotionEvent.ACTION_UP){
            MenuBarView.this.setAlpha(1);
        }

        if (event.getAction() == MotionEvent.ACTION_CANCEL){
            MenuBarView.this.setAlpha(1);
        }

        return super.onTouchEvent(event);
    }
}
