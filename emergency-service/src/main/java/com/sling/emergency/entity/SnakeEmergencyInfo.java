package com.sling.emergency.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.util.Date;
import java.util.List;

/**
 * Snake emergency info entity.
 * <p>
 * Stores snake identification data, venom information, emergency treatment guidance,
 * and associated image URLs.
 */
@TableName("snake_emergency_info")
public class SnakeEmergencyInfo {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("snake_name")
    private String snakeName;

    @TableField("snake_alias")
    private String snakeAlias;

    @TableField("venom_type")
    private String venomType;

    @TableField("symptom_description")
    private String symptomDescription;

    @TableField("emergency_treatment")
    private String emergencyTreatment;

    @TableField("medical_attention")
    private String medicalAttention;

    @TableField("image_url")
    private String imageUrl;

    @TableField("latin_name")
    private String latinName;

    @TableField("forbidden_actions")
    private String forbiddenActions;

    @TableField("serum_type")
    private String serumType;

    @TableField("hospital_department")
    private String hospitalDepartment;

    /** Transient field -- populated externally, not mapped to a DB column. */
    @TableField(exist = false)
    private List<String> imageUrls;

    @TableField("created_time")
    private Date createdTime;

    @TableField("updated_time")
    private Date updatedTime;

    @TableField("del_flag")
    private Integer delFlag;

    // ---- Getters and Setters ----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSnakeName() {
        return snakeName;
    }

    public void setSnakeName(String snakeName) {
        this.snakeName = snakeName;
    }

    public String getSnakeAlias() {
        return snakeAlias;
    }

    public void setSnakeAlias(String snakeAlias) {
        this.snakeAlias = snakeAlias;
    }

    public String getVenomType() {
        return venomType;
    }

    public void setVenomType(String venomType) {
        this.venomType = venomType;
    }

    public String getSymptomDescription() {
        return symptomDescription;
    }

    public void setSymptomDescription(String symptomDescription) {
        this.symptomDescription = symptomDescription;
    }

    public String getEmergencyTreatment() {
        return emergencyTreatment;
    }

    public void setEmergencyTreatment(String emergencyTreatment) {
        this.emergencyTreatment = emergencyTreatment;
    }

    public String getMedicalAttention() {
        return medicalAttention;
    }

    public void setMedicalAttention(String medicalAttention) {
        this.medicalAttention = medicalAttention;
    }

    /**
     * Returns the primary image URL (may be a remote URL or local file path).
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Sets the primary image URL (remote URL or local file path).
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLatinName() {
        return latinName;
    }

    public void setLatinName(String latinName) {
        this.latinName = latinName;
    }

    public String getForbiddenActions() {
        return forbiddenActions;
    }

    public void setForbiddenActions(String forbiddenActions) {
        this.forbiddenActions = forbiddenActions;
    }

    public String getSerumType() {
        return serumType;
    }

    public void setSerumType(String serumType) {
        this.serumType = serumType;
    }

    public String getHospitalDepartment() {
        return hospitalDepartment;
    }

    public void setHospitalDepartment(String hospitalDepartment) {
        this.hospitalDepartment = hospitalDepartment;
    }

    /**
     * Returns the pre-populated list of multi-image URLs.
     * <p>
     * This is a pure getter with no side effects. Callers should populate the list
     * via {@link #setImageUrls(List)} beforehand (for instance from
     * {@code SnakeEmergencyInfoService#populateImageUrls}).
     */
    public List<String> getImageUrls() {
        return imageUrls;
    }

    /**
     * Sets the list of multi-image URLs.
     */
    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Integer getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Integer delFlag) {
        this.delFlag = delFlag;
    }

    /**
     * Returns a backend-proxy image URL suitable for frontend display.
     * Avoids CORS and hotlink-protection issues by routing through the backend.
     *
     * @return the proxy URL, or the raw imageUrl if URL-encoding fails
     */
    public String getBackendImageUrl() {
        if (this.imageUrl == null || this.imageUrl.isEmpty()) {
            return this.imageUrl;
        }
        try {
            if (this.imageUrl.startsWith("http")) {
                return "/api/emergency/image/online?url=" + java.net.URLEncoder.encode(this.imageUrl, "UTF-8");
            } else {
                return "/api/emergency/image/local?path=" + java.net.URLEncoder.encode(this.imageUrl, "UTF-8");
            }
        } catch (java.io.UnsupportedEncodingException e) {
            // UTF-8 is always available -- fall back to raw URL
            return this.imageUrl;
        }
    }
}
