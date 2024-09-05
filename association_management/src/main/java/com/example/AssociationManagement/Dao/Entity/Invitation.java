package com.example.AssociationManagement.Dao.Entity;

import com.example.AssociationManagement.Dao.Enumerations.EtatMembre;
import com.example.AssociationManagement.Dao.Enumerations.InvitationType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "invitation")
public class Invitation {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private boolean response;
    private boolean state;
    private int nbMinPositif;
    private InvitationType type;
    private boolean cancelled;
    @ManyToOne
    @JoinColumn(name = "concerned_member_id", nullable = true)
    private Membre_Asso concernedMember; // Member who receives the invitation

    @ManyToOne
    @JoinColumn(name = "responding_member_id", nullable = false)
    private Membre_Asso respondingMember;

    @ManyToOne
    @JoinColumn(name = "role_asso_id", nullable = true)
    private Role_Asso concernedRole;

    @ManyToOne
    @JoinColumn(name = "association_id", nullable = true)
    private Association association;

    public String getId() {
        return id;
    }

    public boolean isCancelled() {
        return cancelled;
    }

    public void setCancelled(boolean cancelled) {
        this.cancelled = cancelled;
    }

    public Role_Asso getConcernedRole() {
        return concernedRole;
    }

    public void setConcernedRole(Role_Asso concernedRole) {
        this.concernedRole = concernedRole;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public int getNbMinPositif() {
        return nbMinPositif;
    }

    public void setNbMinPositif(int nbMinPositif) {
        this.nbMinPositif = nbMinPositif;
    }

    public InvitationType getType() {
        return type;
    }

    public void setType(InvitationType type) {
        this.type = type;
    }

    public Membre_Asso getConcernedMember() {
        return concernedMember;
    }

    public void setConcernedMember(Membre_Asso concernedMember) {
        this.concernedMember = concernedMember;
    }

    public Membre_Asso getRespondingMember() {
        return respondingMember;
    }

    public void setRespondingMember(Membre_Asso respondingMember) {
        this.respondingMember = respondingMember;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isResponse() {
        return response;
    }

    public void setResponse(boolean response) {
        this.response = response;
    }

    public Association getAssociation() {
        return association;
    }

    public void setAssociation(Association association) {
        this.association = association;
    }


}
