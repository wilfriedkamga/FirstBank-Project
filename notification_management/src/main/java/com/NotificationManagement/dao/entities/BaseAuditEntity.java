package com.NotificationManagement.dao.entities;

import lombok.*;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.StringUtils;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * Base class to represent auditing details of each entity
 *
 * Timestamps and user details are stored for each change made to the entity.
 *
 * Timestamps are recorded in UTC time, adjust accordingly to see timestamp in current zone
 *
 * Default user is 'SYSTEM'.
 */
@Setter
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseAuditEntity {
	private static final String MAURITIUS_ZONE_ID = "Indian/Mauritius";
	private static final String SYSTEM = "SYSTEM";

	@CreatedDate
	@Column(name = "date_created")
	private LocalDateTime dateCreated;

	@CreatedBy
	@Column(name = "created_by")
	private String createdBy;

	@LastModifiedDate
	@Column(name = "date_modified")
	private LocalDateTime dateModified;

	@LastModifiedBy
	@Column(name = "modified_by")
	private String modifiedBy;

	private boolean deleted;

	public void setAuditFields(String createdBy, String modifiedBy) {
	if(!StringUtils.isEmpty(createdBy)) {
		this.createdBy = createdBy;
	}

	if(!StringUtils.isEmpty(modifiedBy)) {
		this.modifiedBy = modifiedBy;
		dateModified = LocalDateTime.now(ZoneId.of(MAURITIUS_ZONE_ID));
		}
	}

	public void resetModifiedDate() {
		dateModified = LocalDateTime.now(ZoneId.of(MAURITIUS_ZONE_ID));
	}
}
