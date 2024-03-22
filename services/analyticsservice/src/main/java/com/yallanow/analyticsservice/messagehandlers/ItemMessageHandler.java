package com.yallanow.analyticsservice.messagehandlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.spring.pubsub.support.GcpPubSubHeaders;
import com.yallanow.analyticsservice.models.Item;
import com.yallanow.analyticsservice.services.ItemService;
import com.yallanow.analyticsservice.utils.ItemConverter;
import com.yallanow.analyticsservice.exceptions.ItemServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;
import java.util.Map;
import com.google.cloud.spring.pubsub.support.BasicAcknowledgeablePubsubMessage;


@Component
public class ItemMessageHandler {

    private static final Logger logger = LoggerFactory.getLogger(ItemMessageHandler.class);
    private final ItemService itemService;
    private final ObjectMapper objectMapper;
    private final ItemConverter itemConverter;

    @Autowired
    public ItemMessageHandler(ItemService itemService, ObjectMapper objectMapper, ItemConverter itemConverter) {
        this.itemService = itemService;
        this.objectMapper = objectMapper;
        this.itemConverter = itemConverter;
    }

    @ServiceActivator(inputChannel = "eventInputChannel")
    public void handleMessage(Message<?> message) {
        BasicAcknowledgeablePubsubMessage originalMessage = message.getHeaders().get(GcpPubSubHeaders.ORIGINAL_MESSAGE, BasicAcknowledgeablePubsubMessage.class);
        if (originalMessage == null) {
            throw new IllegalArgumentException("Message does not contain an AcknowledgeablePubsubMessage");
        }

        String payload = new String((byte[]) message.getPayload());
        try {

            Item item = itemConverter.fromPubsubMessage(payload);
            String operationType = getOperationType(payload);

            switch (operationType) {
                case "ADD":
                    itemService.addItem(item);
                    break;
                case "UPDATE":
                    itemService.updateItem(item);
                    break;
                case "DELETE":
                    itemService.deleteItem(item);
                    break;
                default:
                    logger.error("Invalid operation type: {}", operationType);
            }

            originalMessage.ack();
        } catch (ItemServiceException e) {
            logger.error("Error processing item: {}", payload, e);
        } catch (Exception e) {
            logger.error("Unexpected error processing message: {}", payload, e);
        } finally {
            originalMessage.ack();
        }
    }

    private String getOperationType(String message) throws JsonProcessingException {
        Map<String, Object> payload = objectMapper.readValue(message, Map.class);
        return (String) payload.get("operation");
    }
}

