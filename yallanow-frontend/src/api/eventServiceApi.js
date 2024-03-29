import axios from "axios";
import config from "../config/config";

class EventServiceApi {
    constructor() {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("idToken");
        this.baseUrl = config.eventsBaseUrl;
    }

    async createEvent(eventRequest) {
        try {
            const response = await axios.post(this.baseUrl + "/AddEvent", eventRequest, {
                headers: { "Content-Type": "application/json" },
            });
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async updateEvent(eventRequest) {
        try {
            const response = await axios.post(this.baseUrl + "/UpdateEvent", eventRequest, {
                headers: { "Content-Type": "application/json" },
            });
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async getEvent(eventId) {
        try {
            const response = await axios.get(this.baseUrl + "/GetEvent/" + eventId);
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async getEventsForGroup(groupId) {
        try {
            const response = await axios.get(this.baseUrl + "/GetGroupEvents/" + groupId);
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async deleteEvent(eventId) {
        try {
            const response = await axios.delete(this.baseUrl + "/DeleteEvent/" + eventId);
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async getRsvpdUsersForEvent(eventId) {
        try {
            const response = await axios.get(this.baseUrl + "/GetAllEventParticipants/" + eventId);
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async getUserRsvpdEvents(currentUser) {
        try {
            const response = await axios.get(this.baseUrl + "/GetAllUserEvents");
            this.handleResponse(response);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async unRsvpUserFromEvent(userId, eventId) {
        try {
            const response = await axios.delete(this.baseUrl + "/DeleteParticipant/" + eventId, {
                data: { userId: userId },
            });
            this.handleResponse(response, true);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async isUserRsvpdToEvent(userId, eventId) {
        try {
            const response = await axios.get(this.baseUrl + "/GetParticipantStatus/" + eventId);
            this.handleResponse(response, true);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async rsvpUserToEvent(userId, eventId) {
        try {
            const request = {
                userId: userId,
                eventId: eventId,
                participantStatus: "Attending",
            };
            const response = await axios.post(this.baseUrl + "/AddParticipant", request, {
                headers: { "Content-Type": "application/json" },
            });
            this.handleResponse(response, true);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    async updateRsvpStatus(userId, eventId, status) {
        try {
            const request = {
                userId: userId,
                eventId: eventId,
                participantStatus: status,
            };
            const response = await axios.post(this.baseUrl + "/UpdateParticipant", request, {
                headers: { "Content-Type": "application/json" },
            });
            this.handleResponse(response, true);
        } catch (error) {
            throw new Error("Error communicating with server.");
        }
    }

    handleResponse(response, isBoolean = false) {
        if (response.status === 200) {
            return isBoolean ? true : response.data;
        } else if (response.status === 403) {
            throw new Error("Access denied.");
        } else if (response.status === 404) {
            throw new Error("Resource not found.");
        } else if (response.status === 400) {
            throw new Error("Bad request: " + response.data);
        } else if (response.status === 422) {
            throw new Error("Maximum capacity reached.");
        } else {
            throw new Error("Error processing request.");
        }
    }
}

export default new EventServiceApi();
