package com.afb.intern.savingsplanmanagement.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "saving_plans")
public class Saving {

    @Id
    private String Id;

    @Column(name = "reason", nullable = false)
    private String reason;

    @Column(name = "status", nullable = false)
    private String status;

    @ElementCollection
    @CollectionTable(name = "saving_plan_reminder_dates", joinColumns = @JoinColumn(name = "saving_plan_id"))
    @Column(name = "reminder_date")
    @Temporal(TemporalType.DATE)
    private List<Date> reminder;

    @Column(name = "actual_amount", nullable = false)
    private Double savingBalance;

    @Column(name = "set_amount", nullable = false)
    private Double amountTarget;

    @Column(name = "startDate", nullable = false)
    private Date startDate;

    @Column(name = "Deadline", nullable = false)
    private Date dueDate;

    @Column(name = "created_by", nullable = false)
    private String phone;
}
