/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.List;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author agile
 */
public class Upload extends HttpServlet {

    String image_in_file;                      // to get string from index.html page's request
    private static final long serialVersionUID = 1L; // uid for servlet
    private final String UPLOAD_DIRECTORY = "C:\\Users\\agile\\Documents\\image crop\\CropandZoomimage\\web\\img\\";       // static path to the folder
    String name = null;   // to store file name
    String fileType = null;     // to store file type
    String fileTypeandURL = null;  //to store file type and the base64 string
    String extension = null;    // to store extension of image
    String datetime = null;    //  to store date and time in miliseconds
    String image = null;      // to store actual encoded base64 string

    protected void doPost(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {

        HttpSession session = request.getSession();
        // get string from index.html's request
        image_in_file = request.getParameter("image_file");

        //to get index of : in encoded string
        int i = image_in_file.indexOf(":");
        System.out.println("index of ':' :" + i);

        if (i > 0) {
            fileTypeandURL = image_in_file.substring(i + 1);
            System.out.println("fileType and image url" + fileTypeandURL);
        }

        //to get index of ; in encoded string
        int j = fileTypeandURL.indexOf(";");
        System.out.println("index of ';' :" + j);

        if (j > 0) {
            fileType = fileTypeandURL.substring(0, j);
            System.out.println("fileType: " + fileType);

        }

        // to get index of , in encoded string and get the image's substring from it
        int k = image_in_file.indexOf(",");
        System.out.println("index of ',' :" + k);

        if (k > 0) {
            image = image_in_file.substring(k + 1);
            System.out.println("image : " + image);

        }

        //checks file type and stores into extension
        if (fileType.equalsIgnoreCase("image/jpeg")) {
            extension = "jpg";
        }
        if (fileType.equalsIgnoreCase("image/png")) {
            extension = "png";
        }
        if (fileType.equalsIgnoreCase("image/gif")) {
            extension = "gif";
        }

        // to decode the base64 image to byte array
        byte[] imageByteArray = decodeImage(image);

        // to get time into milliseconds
        Calendar calendar = Calendar.getInstance();
        long milis = calendar.getTimeInMillis();
        datetime = Long.toString(milis);
        name = datetime;

        // Write image byte array into file system
        FileOutputStream imageOutFile = new FileOutputStream("C:\\Users\\agile\\Documents\\image crop\\CropandZoomimage\\web\\img\\" + name + "." + extension);
        imageOutFile.write(imageByteArray);

        //file object close
        imageOutFile.close();

        //store image string to session so it can be displayed on CroppedImage JSP page
        session.setAttribute("image", image_in_file);
        
        // redirects on CroppedImage.jsp page.
        response.sendRedirect("/CropandZoomimage/CroppedImage.jsp");
    }

    public static byte[] decodeImage(String imageDataString) {
        return Base64.decodeBase64(imageDataString);
    }
}
