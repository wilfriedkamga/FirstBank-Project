package com.TontineManagement.business;

import com.TontineManagement.dao.entities.*;
import com.TontineManagement.dao.model.TontineModel;

public interface ITontineManagerBus {

	Tontine creer(TontineModel tontineModel) throws Exception;

}