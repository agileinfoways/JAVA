<%-- 
    Document   : CroppedImage
    Created on : Nov 18, 2014, 2:51:40 PM
    Author     : agile
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>


<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <img src="<%=session.getAttribute("image")%>">
    </body>
</html>
