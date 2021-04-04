package com.example.demo.Recomendation;

public class Matrix {
    private int rows;
    private  int columns;
    private  int[][] array;
    public Matrix(int rows,int columns){
        this.rows=rows;
        this.columns=columns;
        this.array=new int[rows][columns];
    }
    public void InitializeRandomly(){

        for(int i=0;i<rows;i++){
            for(int j=0;j<columns;j++){
                array[i][j]= (int) Math.random()*6; //from 0 to 5
            }
        }
    }
    public int getElement(int i,int j){
        return array[i][j];
    }
    public int[] getRow(int i){
        return array[i];
    }
    public void update_ith_row(int n){

    }
    public void update_jth_column(int n){

    }
    public void setElement(int i,int j,int value){
        this.array[i][j]=value;
    }
}
