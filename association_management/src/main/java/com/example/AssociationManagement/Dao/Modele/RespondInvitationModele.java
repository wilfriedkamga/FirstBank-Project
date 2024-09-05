package com.example.AssociationManagement.Dao.Modele;

import com.example.AssociationManagement.Dao.Enumerations.InvitationType;

public class RespondInvitationModele {
        private String associationId;
        private String responderId;
        private boolean response;
        private InvitationType type;
        private String roleId;

        public String getAssociationId() {
                return associationId;
        }

        public void setAssociationId(String associationId) {
                this.associationId = associationId;
        }

        public String getResponderId() {
                return responderId;
        }

        public void setResponderId(String responderId) {
                this.responderId = responderId;
        }

        public boolean isResponse() {
                return response;
        }

        public void setResponse(boolean response) {
                this.response = response;
        }

        public InvitationType getType() {
                return type;
        }

        public void setType(InvitationType type) {
                this.type = type;
        }

        public String getRoleId() {
                return roleId;
        }

        public void setRoleId(String roleId) {
                this.roleId = roleId;
        }
}
