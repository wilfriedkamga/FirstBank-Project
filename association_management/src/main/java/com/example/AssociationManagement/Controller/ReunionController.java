package com.example.AssociationManagement.Controller;

import com.example.AssociationManagement.Business.ReunionBus;
import com.example.AssociationManagement.Dao.Dto.ReunionDto;
import com.example.AssociationManagement.Dao.Modele.CommonResponseModel;
import com.example.AssociationManagement.Dao.Modele.CreateReunionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;

@RestController
@RequestMapping("/api/reunions")
public class ReunionController {

    @Autowired
    private ReunionBus reunionService;

    @PostMapping("/")
    public CommonResponseModel createReunion(@RequestBody CreateReunionModel model) {
        ReunionDto reunion = reunionService.createReunion(model);
        return new CommonResponseModel("Success","0",null);
    }

    @GetMapping("/")
    public CommonResponseModel get() {
        return new CommonResponseModel("Success","0",reunionService.getAllReunions());
    }

    @GetMapping("/{id}")
    public CommonResponseModel getMeet(@PathVariable String id) {
        return new CommonResponseModel("Success","0",reunionService.getOneMeet(id));
    }

    @PutMapping("/start/{id}")
    public CommonResponseModel startReunion(@PathVariable String id) {
        ReunionDto reunion = reunionService.startReunion(id);
        return new CommonResponseModel("sucess","0",reunion);
    }

    @PutMapping("/end/{id}")
    public CommonResponseModel endReunion(@PathVariable String id) {
        ReunionDto reunion = reunionService.endReunion(id);
        return new CommonResponseModel("sucess","0",reunion);
    }

    @PutMapping("/edit/{id}")
    public CommonResponseModel editReunion(@PathVariable String id, @RequestBody CreateReunionModel model) {
        ReunionDto reunion = reunionService.editReunion(id,model);
        return new CommonResponseModel("sucess","0",reunion);
    }

    @DeleteMapping("/{id}")
    public CommonResponseModel deleteReunion(@PathVariable String id) {
        reunionService.deleteReunion(id);
        return new CommonResponseModel("sucess","0",null);
    }
}
