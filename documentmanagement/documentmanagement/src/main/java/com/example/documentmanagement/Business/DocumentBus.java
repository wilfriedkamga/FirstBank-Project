package com.example.documentmanagement.Business;

import com.example.documentmanagement.Dao.Entity.Document;
import com.example.documentmanagement.Dao.Repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class DocumentBus{
    @Autowired
    private DocumentRepository documentRepository;

    @Value("${UPLOAD_DIR}")
    private String uploadDir;

    @Value("${GET_DOCUMENT_BASE_URL}")
    private String documentBaseUrl;

    @Value("${ICON_IMAGE_URL}")
    private String iconImageUrl;

    @Value("${ICON_WORD_URL}")
    private String iconWordUrl;

    @Value("${ICON_EXCEL_URL}")
    private String iconExcelUrl;

    @Value("${ICON_PDF_URL}")
    private String iconPdfUrl;

    @Value("${ICON_DEFAULT_URL}")
    private String iconDefaultUrl;

    public Document uploadFile(MultipartFile file, String description, boolean visibilityAll) throws IOException {
        String extension = getExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID().toString() + "." + extension;
        String filePath = uploadDir + fileName;
        String iconUrl = getIconUrl(extension);

        // Save file to disk
        byte[] bytes = file.getBytes();
        Path path = Paths.get(filePath);
        Files.write(path, bytes);

        // Create Document entity
        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setSize(file.getSize());
        document.setCreationDate(LocalDate.now());
        document.setExtension(extension);
        document.setDescription(description);
        document.setVisibilityAll(visibilityAll);
        document.setIconUrl(iconUrl);
        document.setFilePath(filePath);

        return documentRepository.save(document);
    }

    public Resource downloadFile(String documentId, String destinationPath) throws FileNotFoundException, MalformedURLException, IOException {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new FileNotFoundException("Document not found with id " + documentId));

        Path path = Paths.get(document.getFilePath());
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() && resource.isReadable()) {
            if (destinationPath != null && !destinationPath.isEmpty()) {
                Path destination = Paths.get(destinationPath, document.getName());
                Files.copy(resource.getInputStream(), destination);
            }
            return resource;
        } else {
            throw new FileNotFoundException("File not found or not readable");
        }
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    private String getIconUrl(String extension) {
        switch (extension.toLowerCase()) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
                return iconImageUrl;
            case "doc":
            case "docx":
                return iconWordUrl;
            case "xls":
            case "xlsx":
                return iconExcelUrl;
            case "pdf":
                return iconPdfUrl;
            default:
                return iconDefaultUrl;
        }
    }

}
