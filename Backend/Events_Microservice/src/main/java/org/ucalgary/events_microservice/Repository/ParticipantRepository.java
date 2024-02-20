package org.ucalgary.events_microservice.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.ucalgary.events_microservice.Entity.ParticipantEntity;

/**
 * Repository interface for managing ParticipantEntity objects in the database.
 * This interface provides methods to perform CRUD operations on ParticipantEntity objects.
 */
@Repository
public interface ParticipantRepository extends JpaRepository<ParticipantEntity, Integer> {
   Optional<ParticipantEntity> findParticipantByParticipantId(Integer participantId); // find participant by participant id
   List<ParticipantEntity> findAllByUserId(Integer userId); // find all Events a User is registerd for using user id
   Optional<ParticipantEntity> findByUserIdAndEvent_EventId(Integer userId, Integer eventId); // find participant by user id and event id
   Optional<ArrayList<ParticipantEntity>> findAllByEvent_EventId(Integer eventID); // find all participants in a certain event
}
