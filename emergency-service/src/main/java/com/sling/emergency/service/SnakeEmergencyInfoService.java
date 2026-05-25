package com.sling.emergency.service;

import com.sling.emergency.entity.SnakeEmergencyInfo;

import java.util.List;

/**
 * Service interface for snake emergency info CRUD and matching.
 */
public interface SnakeEmergencyInfoService {

    /**
     * Find emergency info by snake species name.
     *
     * @param snakeName the snake species name
     * @return the matching emergency info, or {@code null} if not found
     */
    SnakeEmergencyInfo getBySnakeName(String snakeName);

    /**
     * List all non-deleted snake emergency info records.
     */
    List<SnakeEmergencyInfo> listAll();

    /**
     * Match possible snake species based on symptom description.
     *
     * @param symptoms the symptom description
     * @return possible matching species
     */
    List<SnakeEmergencyInfo> matchBySymptoms(String symptoms);

    /**
     * Update an existing snake emergency info record by its ID.
     *
     * @param snakeEmergencyInfo the record with updated fields
     * @return true if the update succeeded
     */
    boolean updateById(SnakeEmergencyInfo snakeEmergencyInfo);

    /**
     * Insert a new snake emergency info record.
     *
     * @param snakeEmergencyInfo the record to insert
     * @return true if the insert succeeded
     */
    boolean save(SnakeEmergencyInfo snakeEmergencyInfo);

    /**
     * Populate the {@code imageUrls} transient field by scanning the local image
     * directory for files matching this record's primary {@code imageUrl} pattern.
     * <p>
     * This method performs file I/O and should be called explicitly before
     * the entity is serialized for a response.
     *
     * @param emergencyInfo the entity to populate (mutated in-place)
     * @param imageDir      the root directory where local images are stored
     */
    void populateImageUrls(SnakeEmergencyInfo emergencyInfo, String imageDir);
}
