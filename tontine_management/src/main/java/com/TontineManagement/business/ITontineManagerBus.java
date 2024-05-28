package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.CaisseModel;
import com.TontineManagement.dao.model.MembreCaisseModel;
import com.TontineManagement.dao.model.TontineModel;
import com.TontineManagement.dao.model.MembreTontineModel;

import java.util.List;

public interface ITontineManagerBus {

	Tontine creer(TontineModel tontineModel) throws Exception;
	List<Tontine> getAllTontines(String phoneNumber) throws Exception;
	Tontine deleteTontine(String Idtontine) throws Exception;
	Caisse createCaisse(CaisseModel caisseModel) throws Exception;
	MembresTontine addMembresTontine(MembreTontineModel membreTontineModel) throws Exception;
	MembresCaisse addMembresCaisse(MembreCaisseModel membreCaisseModel) throws Exception;
	public List<Caisse> getAllCaisses(String idTontine) throws Exception;
	List<MembresCaisse> getAllMembreCaisse(String idCaisse) throws Exception;
	public List<MembresTontine> getAllMembreTontine(String idTontine) throws Exception;
}