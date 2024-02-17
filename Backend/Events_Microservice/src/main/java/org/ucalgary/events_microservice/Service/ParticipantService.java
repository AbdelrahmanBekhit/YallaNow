package org.ucalgary.events_microservice.Service;

import org.ucalgary.events_microservice.DTO.ParticipantDTO;
import org.ucalgary.events_microservice.Repository.ParticipantRepository;

import jakarta.transaction.Transactional;

public class ParticipantService {
    private static ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        ParticipantService.participantRepository = participantRepository;
    }

    @SuppressWarnings("null")
    @Transactional
    public static void addParticipant(ParticipantDTO participant){
        participantRepository.save(participant);
    }

    public static void updateParticipant(int participantID, int eventID){
        ParticipantDTO participant = participantRepository.findById(participantID)
            .orElseThrow(() -> new RuntimeException("Participant not found with id: " + participantID));
        participant.setEventid(eventID);
        participantRepository.save(participant);
    }

    public static void getParticipant(int participantID, int eventID){
        participantRepository.findById(participantID)
            .orElseThrow(() -> new RuntimeException("Participant not found with id: " + participantID));
    }

    public static void deleteParticipant(int participantID, int eventID){
        if (participantRepository.existsById(participantID)) {
            participantRepository.deleteById(participantID);
        } else {
            throw new RuntimeException("Participant not found with id: " + participantID);
        }
    }    
}
