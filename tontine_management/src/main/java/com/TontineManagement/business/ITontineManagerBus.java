package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.TontineModel;

import java.util.List;

public interface ITontineManagerBus {

	Tontine creer(TontineModel tontineModel) throws Exception;
	List<Tontine> getAllTontines() throws Exception;

}