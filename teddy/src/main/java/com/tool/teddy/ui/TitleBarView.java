package com.tool.teddy.ui;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.support.v7.widget.LinearLayoutCompat;
import android.util.AttributeSet;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

/**
 * Created by teddy on 2017/2/23.
 */

public class TitleBarView extends LinearLayout{
    private TextView mTitleView;
    private Button backBtn;

    private String bgColor;
    private String mTitle;
    private String textColor;
    private boolean backBtnVisible;

    public TitleBarView(Context context, AttributeSet attrs) {
        super(context, attrs);

        TypedArray parms = context.obtainStyledAttributes(attrs,R.styleable.TitleBarView);
        mTitle = parms.getString(R.styleable.TitleBarView_title);
        bgColor = parms.getString(R.styleable.TitleBarView_bg_color);
        textColor = parms.getString(R.styleable.TitleBarView_t_color);
        backBtnVisible = parms.getBoolean(R.styleable.TitleBarView_backbtn_visable,false);

        init(context);
    }

    private void init(Context context){
        setOrientation(HORIZONTAL);
        setGravity(Gravity.CENTER);
        int leftPadding = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 16, this.getResources().getDisplayMetrics());
        setPadding(leftPadding,0,0,0);
        setBackgroundColor(Color.parseColor(bgColor));


        mTitleView = new TextView(context);
        mTitleView.setTextColor(textColor == null?Color.WHITE:Color.parseColor(textColor));
        mTitleView.setTextSize(TypedValue.COMPLEX_UNIT_SP,20);
        mTitleView.setGravity(Gravity.CENTER);
        mTitleView.setText(mTitle);
        LinearLayoutCompat.LayoutParams mTitleParams = new LinearLayoutCompat.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,ViewGroup.LayoutParams.MATCH_PARENT,1.0f);

        backBtn = new Button(context);
        backBtn.setVisibility(backBtnVisible ? VISIBLE : INVISIBLE);
        backBtn.setBackgroundResource(R.mipmap.app_back);
        int backBtnWidth = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 13, this.getResources().getDisplayMetrics());
        int backBtnHeight = (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 23, this.getResources().getDisplayMetrics());
        LinearLayoutCompat.LayoutParams mBackParams = new LinearLayoutCompat.LayoutParams(backBtnWidth,backBtnHeight);
        mBackParams.setMargins(30, 50, 22, 10);

        addView(backBtn,mBackParams);
        addView(mTitleView,mTitleParams);
    }
}
