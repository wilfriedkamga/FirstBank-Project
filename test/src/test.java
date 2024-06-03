import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class test {

    public static void main(String args[]){
        String source="C:\\Users\\jorda\\Desktop\\react-app-js-tailwind\\react-app-js-tailwind\\app\\src\\Avatar.png";
        String director="C:\\Users\\jorda\\Desktop\\Projet First Bank\\ASSETS\\IMAGES\\";
        uploadFile(source,director,"newFileTest.jpg");
    }

    public static void uploadFile(String sourceFilePath, String directoryPath, String fileName) {
        try {
            // Créer un objet File à partir du chemin du fichier source
            File sourceFile = new File(sourceFilePath);

            // Lire les octets du fichier source
            FileInputStream fileInputStream = new FileInputStream(sourceFile);
            byte[] fileBytes = new byte[(int) sourceFile.length()];
            fileInputStream.read(fileBytes);
            fileInputStream.close();

            // Écrire le fichier dans le répertoire de destination
            Path destinationPath = Paths.get(directoryPath, fileName);
            Files.write(destinationPath, fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}