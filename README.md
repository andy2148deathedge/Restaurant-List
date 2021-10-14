# Restaurant-List
AC 餐廳介紹網站作業

本專案利用NodeJS/Express，打造一個可供User 瀏覽餐廳資訊，並可自行新增與編輯、刪除餐廳資料的功能網站; 並且利用 MongoDB 資料庫建立餐廳種子資料以及作為伺服器資料庫相關CRUD功能。

![image](https://github.com/andy2148deathedge/Restaurant-List/blob/main/A3%E9%A4%90%E5%BB%B3%E4%BD%9C%E6%A5%AD%E6%88%AA%E5%9C%96.PNG)

# 產品規格
1、使用者可瀏覽餐廳列表、列表按種子資料先後排序

2、可點擊觀看餐廳詳細資訊及介紹

3、可用關鍵字查詢對應餐廳

4、可自行新增餐廳

5、可自該餐廳頁面編輯餐廳資訊

6、可自該餐廳頁面刪除餐廳

7、符合 RESTful 語意化網址路徑

![image](https://github.com/andy2148deathedge/Restaurant-List/blob/main/restaurant_CRUD.PNG)

# Tools
環境：Visual Studio Code、Node.js

框架：bootstrap、Express

模板引擎：Express-Handlebars

資料庫：MangoDB

路由語意化套件: method-override

# 安裝:
1、確認開發環境

2、終端機 Clone 此專案至本機

3、cd 進本專案資料夾 <資料夾名稱>

4、安裝npm，輸入 $ npm install

5、安裝相關套件，輸入 $ npm install express nodemon express-handlebars mongoose method-override

6、執行檔案腳本: $ npm run dev