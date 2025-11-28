<template>
    <div class="award-management-container">
        <!-- Header Section -->
        <div class="upload-header">
            <div class="header-content">
                <div class="header-icon">
                    <i class="bi bi-trophy"></i>
                </div>
                <div class="header-text">
                    <h1>{{ awardId ? "Edit Award" : "Create New Award" }}</h1>
                    <p>Manage awards and winners with Excel import/export</p>
                </div>
            </div>
            <div class="header-actions">
                <button class="btn-help" @click="showHelp = true">
                    <i class="bi bi-question-circle"></i>
                    Help Guide
                </button>
                <button class="btn-back" @click="goToDashboard">
                    <i class="bi bi-arrow-left"></i>
                    Back to Dashboard
                </button>
            </div>
        </div>

        <!-- Main Content Grid -->
        <div class="main-content-grid">
            <!-- Left Column - Awards List -->
            <div class="awards-list-section">
                <div class="section-card">
                    <div class="section-header">
                        <h2>Current Awards</h2>
                        <div class="section-actions">
                            <div class="search-container">
                                <div class="search-input-wrapper">
                                    <i class="bi bi-search"></i>
                                    <input type="text" v-model="searchQuery" placeholder="Search awards..."
                                        class="search-input" />
                                </div>
                            </div>
                            <button class="btn-export" @click="exportAwardsExcel">
                                <i class="bi bi-file-earmark-excel"></i>
                                Export Excel
                            </button>
                        </div>
                    </div>

                    <!-- Import Section -->
                    <div class="import-card">
                        <div class="import-header">
                            <h4><i class="bi bi-upload"></i> Import Awards from Excel</h4>
                        </div>
                        <div class="import-content">
                            <div class="file-upload-area" @click="triggerFileInput" @drop="handleDrop"
                                @dragover="handleDragOver">
                                <input type="file" ref="fileInput" @change="handleFileUpload" accept=".xls,.xlsx"
                                    class="file-input" />
                                <div class="upload-content">
                                    <div class="upload-icon">
                                        <i class="bi bi-cloud-arrow-up"></i>
                                    </div>
                                    <div class="upload-text">
                                        <h4>Drop Excel file here</h4>
                                        <p>or click to browse files</p>
                                    </div>
                                </div>
                            </div>
                            <button class="btn-submit-import" @click="submitImportedData"
                                :disabled="!importedData.length || isImporting">
                                <i class="bi" :class="isImporting ? 'bi-arrow-repeat spin' : 'bi-cloud-check'"></i>
                                {{ isImporting ? 'Importing...' : 'Submit Imported Data' }}
                            </button>
                        </div>
                    </div>

                    <!-- Awards List -->
                    <div class="awards-list-container">
                        <div v-if="filteredAwards.length === 0 && !searchQuery" class="empty-state">
                            <i class="bi bi-trophy"></i>
                            <h3>No Awards Yet</h3>
                            <p>Create your first award or import from Excel</p>
                        </div>

                        <div v-else-if="filteredAwards.length === 0" class="empty-state">
                            <i class="bi bi-search"></i>
                            <h3>No Results Found</h3>
                            <p>No awards match "{{ searchQuery }}"</p>
                        </div>

                        <div v-else class="awards-grid">
                            <div v-for="award in filteredAwards" :key="award._id" class="award-card"
                                :class="{ 'active': award._id === awardId }">
                                <div class="award-card-header">
                                    <h4>{{ award.awardName }}</h4>
                                    <span class="winner-count">{{ award.winners.length }} winners</span>
                                </div>
                                <p class="award-description">{{ award.awardDescription }}</p>
                                <div class="award-card-actions">
                                    <button class="btn-edit" @click="editAward(award._id)">
                                        <i class="bi bi-pencil"></i>
                                        Edit
                                    </button>
                                    <button class="btn-delete" @click="confirmDelete(award._id, award.awardName)">
                                        <i class="bi bi-trash"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column - Award Form -->
            <div class="award-form-section">
                <div class="form-card">
                    <div class="form-header">
                        <h2>{{ awardId ? 'Edit Award' : 'Create New Award' }}</h2>
                        <p>Fill in the award details and winners information</p>
                    </div>

                    <form @submit.prevent="submitForm" class="award-form">
                        <!-- Award Details -->
                        <div class="form-section">
                            <h3 class="section-title">Award Details</h3>
                            <div class="form-grid">
                                <div class="form-group full-width">
                                    <label for="awardName">Award Name *</label>
                                    <input id="awardName" type="text" v-model="award.awardName"
                                        placeholder="Enter award name" required
                                        :class="{ 'error': !award.awardName }" />
                                    <span class="error-message" v-if="!award.awardName">Award name is required</span>
                                </div>

                                <div class="form-group full-width">
                                    <label for="awardDescription">Description *</label>
                                    <textarea id="awardDescription" v-model="award.awardDescription"
                                        placeholder="Enter award description" required rows="3"
                                        :class="{ 'error': !award.awardDescription }"></textarea>
                                    <span class="error-message" v-if="!award.awardDescription">Description is
                                        required</span>
                                </div>

                                <div class="form-group">
                                    <label for="orationDetails">Oration / Citation</label>
                                    <textarea id="orationDetails" v-model="award.orationDetails"
                                        placeholder="Optional speech text" rows="3"></textarea>
                                </div>

                                <div class="form-group">
                                    <label for="extraInfo">Extra Information</label>
                                    <textarea id="extraInfo" v-model="award.extraInfo"
                                        placeholder="Any additional notes" rows="3"></textarea>
                                </div>
                            </div>
                        </div>

                        <!-- Winners Section -->
                        <div class="form-section">
                            <div class="section-header">
                                <h3 class="section-title">Winners</h3>
                                <div class="winner-stats">
                                    <span class="winner-count">{{ award.winners.length }} winners</span>
                                    <button type="button" @click="addWinner" class="btn-add-winner">
                                        <i class="bi bi-plus-circle"></i>
                                        Add Winner
                                    </button>
                                </div>
                            </div>

                            <!-- Winner Search -->
                            <div v-if="award.winners.length > 5" class="winner-search">
                                <div class="search-input-wrapper">
                                    <i class="bi bi-search"></i>
                                    <input type="text" v-model="winnerSearchQuery" placeholder="Search winners..." />
                                    <button v-if="winnerSearchQuery" @click="clearWinnerSearch" class="clear-search">
                                        <i class="bi bi-x"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="winners-list">
                                <!-- Search Info -->
                                <div v-if="winnerSearchQuery" class="search-info">
                                    Showing {{ filteredWinners.length }} of {{ award.winners.length }} winners
                                </div>

                                <!-- Winners -->
                                
                                <div v-for="winnerData in filteredWinners" :key="winnerData.originalIndex"
                                    class="winner-card">
                                    <div class="winner-card-header">
                                        <div class="winner-title">
                                            <i class="bi bi-person-circle"></i>
                                            Winner #{{ winnerData.originalIndex + 1 }}
                                        </div>
                                        <button type="button" @click="removeWinner(winnerData.originalIndex)"
                                            class="btn-remove-winner" :disabled="award.winners.length === 1">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <div class="winner-fields">
                                        <div class="form-group">
                                            <label>Year *</label>
                                            <input type="text" v-model="winnerData.winner.year" placeholder="Year"
                                                required :class="{ 'error': !winnerData.winner.year }" />
                                        </div>
                                        <div class="form-group">
                                            <label>Name *</label>
                                            <input type="text" v-model="winnerData.winner.name"
                                                placeholder="Winner name" required
                                                :class="{ 'error': !winnerData.winner.name }" />
                                        </div>
                                        <div class="form-group">
                                            <label>City</label>
                                            <input type="text" v-model="winnerData.winner.city"
                                                placeholder="City (optional)" />
                                        </div>
                                    </div>
                                </div>

                                <!-- Add Winner Button -->
                                <button type="button" @click="addWinner" class="btn-add-winner-large">
                                    <i class="bi bi-plus-lg"></i>
                                    Add Another Winner
                                </button>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="form-actions">
                            <button type="button" @click="resetForm" class="btn-secondary">
                                <i class="bi bi-x-circle"></i>
                                Cancel
                            </button>
                            <button type="submit" class="btn-primary" :disabled="!isFormValid || loading">
                                <i class="bi" :class="loading ? 'bi-arrow-repeat spin' : 'bi-check-circle'"></i>
                                {{ loading ? "Saving..." : (awardId ? "Update Award" : "Create Award") }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h3>Delete Award</h3>
                    <button class="close-btn" @click="closeModal">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="delete-warning">
                        <i class="bi bi-exclamation-triangle"></i>
                        <h4>Are you sure you want to delete this award?</h4>
                        <p>This action cannot be undone. The following award will be permanently removed:</p>
                        <div class="award-info">
                            <strong>{{ awardToDelete?.name }}</strong>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" @click="closeModal">
                        Cancel
                    </button>
                    <button class="btn-danger" @click="deleteAwardConfirmed">
                        <i class="bi bi-trash"></i>
                        Delete Award
                    </button>
                </div>
            </div>
        </div>

        <!-- Help Modal -->
        <div v-if="showHelp" class="modal-overlay" @click="showHelp = false">
            <div class="modal-content large" @click.stop>
                <div class="modal-header">
                    <h3>Award Management Guide</h3>
                    <button class="close-btn" @click="showHelp = false">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="guide-section">
                        <h4><i class="bi bi-upload"></i> Excel Import Format</h4>
                        <p>Your Excel file should contain these columns:</p>
                        <div class="table-container">
                            <table class="guide-table">
                                <thead>
                                    <tr>
                                        <th>Column Name</th>
                                        <th>Description</th>
                                        <th>Required</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Award Name</strong></td>
                                        <td>Name of the award</td>
                                        <td><span class="required">Yes</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Description</strong></td>
                                        <td>Award description</td>
                                        <td><span class="required">Yes</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Oration Details</strong></td>
                                        <td>Citation or speech text</td>
                                        <td><span class="optional">Optional</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Extra Info</strong></td>
                                        <td>Additional notes</td>
                                        <td><span class="optional">Optional</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Winner Year</strong></td>
                                        <td>Year of winning</td>
                                        <td><span class="required">Yes</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Winner Name</strong></td>
                                        <td>Name of the winner</td>
                                        <td><span class="required">Yes</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Winner City</strong></td>
                                        <td>City of the winner</td>
                                        <td><span class="optional">Optional</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="guide-section">
                        <h4><i class="bi bi-lightbulb"></i> Tips for Success</h4>
                        <ul>
                            <li>Ensure the first row contains column headers exactly as shown above</li>
                            <li>One award can have multiple winners - just repeat the award details for each winner</li>
                            <li>Keep file size under 10MB for better performance</li>
                            <li>Validate data before importing to avoid errors</li>
                            <li>You can export current awards first to see the exact format</li>
                        </ul>
                    </div>

                    <div class="guide-section">
                        <h4><i class="bi bi-shield-check"></i> Validation Rules</h4>
                        <ul>
                            <li>Award Name and Description are required</li>
                            <li>Each winner must have Year and Name</li>
                            <li>At least one winner is required per award</li>
                            <li>Year should be a valid number</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Toast -->
        <div v-if="showSuccess" class="toast success">
            <div class="toast-icon">
                <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="toast-content">
                <h4>Success!</h4>
                <p>{{ successMessage }}</p>
            </div>
            <button class="toast-close" @click="showSuccess = false">
                <i class="bi bi-x"></i>
            </button>
        </div>

        <!-- Error Toast -->
        <div v-if="showError" class="toast error">
            <div class="toast-icon">
                <i class="bi bi-exclamation-circle-fill"></i>
            </div>
            <div class="toast-content">
                <h4>Error!</h4>
                <p>{{ errorMessage }}</p>
            </div>
            <button class="toast-close" @click="showError = false">
                <i class="bi bi-x"></i>
            </button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
    name: "AwardManagement",
    data() {
        return {
            awards: [],
            awardId: null,
            awardToDelete: null,
            showDeleteModal: false,
            loading: false,
            isImporting: false,
            searchQuery: "",
            winnerSearchQuery: "",
            importedData: [],
            showHelp: false,
            showSuccess: false,
            showError: false,
            successMessage: '',
            errorMessage: '',
            award: {
                awardName: "",
                awardDescription: "",
                orationDetails: "",
                extraInfo: "",
                winners: [{ year: "", name: "", city: "" }],
            },
        };
    },
    computed: {
        isFormValid() {
            return (
                this.award.awardName.trim().length > 0 &&
                this.award.awardDescription.trim().length > 0 &&
                this.award.winners.every((w) => w.year.trim() && w.name.trim())
            );
        },
        filteredAwards() {
            if (!this.searchQuery.trim()) return this.awards;
            const query = this.searchQuery.toLowerCase();
            return this.awards.filter(
                (award) =>
                    award.awardName.toLowerCase().includes(query) ||
                    award.awardDescription.toLowerCase().includes(query) ||
                    award.winners.some(
                        (winner) =>
                            winner.name.toLowerCase().includes(query) ||
                            winner.year.includes(query) ||
                            (winner.city && winner.city.toLowerCase().includes(query))
                    )
            );
        },
        filteredWinners() {
            if (!this.winnerSearchQuery.trim()) {
                return this.award.winners.map((winner, index) => ({
                    winner,
                    originalIndex: index,
                }));
            }
            const query = this.winnerSearchQuery.toLowerCase();
            return this.award.winners
                .map((winner, index) => ({ winner, originalIndex: index }))
                .filter(
                    ({ winner }) =>
                        winner.name.toLowerCase().includes(query) ||
                        winner.year.includes(query) ||
                        (winner.city && winner.city.toLowerCase().includes(query))
                );
        },
    },
    mounted() {
        this.fetchAwards();
    },
    methods: {
        // File handling methods
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleDragOver(event) {
            event.preventDefault();
            event.currentTarget.classList.add('drag-over');
        },
        handleDrop(event) {
            event.preventDefault();
            event.currentTarget.classList.remove('drag-over');
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                this.$refs.fileInput.files = files;
                this.handleFileUpload({ target: { files } });
            }
        },

        // Excel Export
        exportAwardsExcel() {
            const awardsToExport = this.filteredAwards.length > 0 ? this.filteredAwards : this.awards;
            const data = [];
            awardsToExport.forEach((award) => {
                award.winners.forEach((w) => {
                    data.push({
                        "Award Name": award.awardName,
                        "Description": award.awardDescription,
                        "Oration Details": award.orationDetails || "",
                        "Extra Info": award.extraInfo || "",
                        "Winner Year": w.year,
                        "Winner Name": w.name,
                        "Winner City": w.city || "",
                    });
                });
            });
            if (!data.length) {
                this.showErrorToast("No awards available to export");
                return;
            }
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Awards");
            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Awards.xlsx");
            this.showSuccessToast("Awards exported successfully");
        },

        // Excel Import
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            // Validate file type
            if (!file.name.match(/\.(xls|xlsx)$/)) {
                this.showErrorToast('Please select a valid Excel file (.xls or .xlsx)');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                    const awardsMap = {};
                    jsonData.forEach((row) => {
                        const key = row["Award Name"];
                        if (!awardsMap[key]) {
                            awardsMap[key] = {
                                awardName: row["Award Name"],
                                awardDescription: row["Description"],
                                orationDetails: row["Oration Details"] || "",
                                extraInfo: row["Extra Info"] || "",
                                winners: [],
                            };
                        }
                        awardsMap[key].winners.push({
                            year: row["Winner Year"].toString(),
                            name: row["Winner Name"],
                            city: row["Winner City"] || "",
                        });
                    });

                    this.importedData = Object.values(awardsMap);
                    this.showSuccessToast("Excel file loaded successfully");
                } catch (error) {
                    console.error('Error parsing Excel file:', error);
                    this.showErrorToast('Error parsing Excel file. Please check the format.');
                }
            };
            reader.readAsArrayBuffer(file);
        },

        async submitImportedData() {
            if (!this.importedData.length) return;
            this.isImporting = true;
            try {
                for (const award of this.importedData) {
                    await axios.post("http://localhost:3000/api/awards", award);
                }
                this.showSuccessToast("Imported data submitted successfully");
                this.importedData = [];
                this.fetchAwards();
            } catch (error) {
                console.error(error);
                this.showErrorToast("Error submitting imported data");
            } finally {
                this.isImporting = false;
            }
        },

        // Awards CRUD
        goToDashboard() {
            window.location.href = "/admin_dashboard";
        },
        async fetchAwards() {
            try {
                const res = await axios.get("http://localhost:3000/api/awards");
                this.awards = res.data;
            } catch {
                this.showErrorToast("Failed to load awards");
            }
        },
        async editAward(id) {
            try {
                const res = await axios.get(`http://localhost:3000/api/awards/${id}`);
                const d = res.data;
                this.award = {
                    awardName: d.awardName,
                    awardDescription: d.awardDescription,
                    orationDetails: d.orationDetails || "",
                    extraInfo: d.extraInfo || "",
                    winners: d.winners.map((w) => ({
                        year: w.year || "",
                        name: w.name || "",
                        city: w.city || "",
                    })),
                };
                this.awardId = id;
                this.winnerSearchQuery = "";
                // Scroll to form
                document.querySelector('.award-form-section').scrollIntoView({ behavior: 'smooth' });
            } catch {
                this.showErrorToast("Failed to load award");
            }
        },
        confirmDelete(id, name) {
            this.awardToDelete = { id, name };
            this.showDeleteModal = true;
        },
        closeModal() {
            this.showDeleteModal = false;
            this.awardToDelete = null;
        },
        async deleteAwardConfirmed() {
            if (!this.awardToDelete) return;
            try {
                await axios.delete(`http://localhost:3000/api/awards/${this.awardToDelete.id}`);
                this.showSuccessToast("Award deleted successfully");
                this.fetchAwards();
                if (this.awardId === this.awardToDelete.id) {
                    this.resetForm();
                }
            } catch {
                this.showErrorToast("Failed to delete award");
            } finally {
                this.closeModal();
            }
        },
        addWinner() {
            this.award.winners.push({ year: "", name: "", city: "" });
            this.winnerSearchQuery = "";
        },
        removeWinner(index) {
            if (this.award.winners.length === 1) {
                this.showErrorToast("At least one winner is required");
                return;
            }
            this.award.winners.splice(index, 1);
            this.showSuccessToast("Winner removed");
        },
        async submitForm() {
            if (!this.isFormValid) {
                this.showErrorToast("Please fill all required fields");
                return;
            }

            this.loading = true;
            try {
                const awardData = {
                    awardName: this.award.awardName.trim(),
                    awardDescription: this.award.awardDescription.trim(),
                    orationDetails: this.award.orationDetails.trim(),
                    extraInfo: this.award.extraInfo.trim(),
                    winners: this.award.winners.map((w) => ({
                        year: w.year.trim(),
                        name: w.name.trim(),
                        city: w.city ? w.city.trim() : "",
                    })),
                };
                if (this.awardId) {
                    await axios.put(`http://localhost:3000/api/awards/${this.awardId}`, awardData);
                    this.showSuccessToast("Award updated successfully");
                } else {
                    await axios.post("http://localhost:3000/api/awards", awardData);
                    this.showSuccessToast("Award created successfully");
                }
                this.resetForm();
                this.fetchAwards();
            } catch (error) {
                console.error(error);
                this.showErrorToast("Failed to save award");
            } finally {
                this.loading = false;
            }
        },
        resetForm() {
            this.award = {
                awardName: "",
                awardDescription: "",
                orationDetails: "",
                extraInfo: "",
                winners: [{ year: "", name: "", city: "" }],
            };
            this.awardId = null;
            this.searchQuery = "";
            this.winnerSearchQuery = "";
        },
        clearWinnerSearch() {
            this.winnerSearchQuery = "";
        },
        showSuccessToast(message) {
            this.successMessage = message;
            this.showSuccess = true;
            setTimeout(() => {
                this.showSuccess = false;
            }, 5000);
        },
        showErrorToast(message) {
            this.errorMessage = message;
            this.showError = true;
            setTimeout(() => {
                this.showError = false;
            }, 5000);
        },
    },
};
</script>

<style scoped>
/* Base container styles matching the Excel upload design */
.award-management-container {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 0 1rem;
}

/* Header Styles - Matching Excel upload */
.upload-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-icon {
    font-size: 3rem;
    opacity: 0.9;
}

.header-text h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.header-text p {
    opacity: 0.9;
    font-size: 1.1rem;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.btn-help,
.btn-back {
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    font-weight: 600;
    border: none;
}

.btn-help {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-help:hover {
    background: rgba(255, 255, 255, 0.3);
}

.btn-back {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
}

.btn-back:hover {
    background: white;
    transform: translateY(-2px);
}

/* Main Content Grid */
.main-content-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 2rem;
    align-items: start;
}

/* Section Cards */
.section-card,
.form-card {
    background: white;
    border-radius: 16px;
    padding: 10px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid #e2e8f0;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.section-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

.section-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
}

/* Search Input */
.search-container {
    flex: 0 0 250px;
}

.search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input-wrapper i {
    position: absolute;
    left: 12px;
    color: #64748b;
}

.search-input-wrapper input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.3s ease;
}

.search-input-wrapper input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.clear-search {
    position: absolute;
    right: 8px;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
}

.clear-search:hover {
    background: #f1f5f9;
}

/* Buttons */
.btn-export,
.btn-submit-import,
.btn-add-winner,
.btn-add-winner-large {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.btn-export {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
}

.btn-export:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(16, 185, 129, 0.4);
}

.btn-submit-import {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
}

.btn-submit-import:hover:not(:disabled) {
    transform: translateY(-2px);
}

.btn-submit-import:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

/* Import Card */
.import-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.import-header {
    background: #f1f5f9;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.import-header h4 {
    margin: 0;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.import-content {
    padding: 1.5rem;
}

.file-upload-area {
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;
}

.file-upload-area:hover,
.file-upload-area.drag-over {
    border-color: #667eea;
    background: #f0f9ff;
}

.file-input {
    display: none;
}

.upload-content {
    transition: all 0.3s ease;
}

.upload-icon {
    font-size: 2.5rem;
    color: #667eea;
    margin-bottom: 1rem;
}

.upload-text h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
}

.upload-text p {
    color: #64748b;
}

/* Awards List */
.awards-list-container {
    max-height: 600px;
    overflow-y: auto;
}

.empty-state {
    text-align: center;
    padding: 3rem 2rem;
    color: #64748b;
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.empty-state h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #475569;
}

.awards-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.award-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
}

.award-card:hover {
    border-color: #6366f1;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.award-card.active {
    border-color: #6366f1;
    background: #f0f9ff;
}

.award-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
}

.award-card-header h4 {
    margin: 0;
    color: #1e293b;
    font-size: 1.125rem;
    font-weight: 600;
}

.winner-count {
    background: #e3f2fd;
    color: #1976d2;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

.award-description {
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.award-card-actions {
    display: flex;
    gap: 0.5rem;
}

.btn-edit,
.btn-delete {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: all 0.3s ease;
}

.btn-edit {
    background: #f0f9ff;
    color: #0369a1;
}

.btn-edit:hover {
    background: #bae6fd;
}

.btn-delete {
    background: #fef2f2;
    color: #dc2626;
}

.btn-delete:hover {
    background: #fecaca;
}

/* Form Styles */
.form-header {
    margin-bottom: 2rem;
}

.form-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 0.5rem;
}

.form-header p {
    color: #64748b;
    margin: 0;
}

.form-section {
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
}

.form-section:last-of-type {
    border-bottom: none;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 1rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group.full-width {
    grid-column: 1 / -1;
}

.form-group label {
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.form-group input,
.form-group textarea,
.form-group select {
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    background: white;

}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group input.error,
.form-group textarea.error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
}

/* Winners Section */
.winner-stats {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.winner-search {
    margin-bottom: 1rem;
}

.winners-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.search-info {
    padding: 0.75rem 1rem;
    background: #e3f2fd;
    border-radius: 8px;
    font-size: 0.875rem;
    color: #1976d2;
    text-align: center;
}

.winner-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1.25rem;
}

.winner-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
}

.winner-title {
    font-weight: 600;
    color: #374151;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-remove-winner {
    background: #fef2f2;
    color: #dc2626;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.btn-remove-winner:hover:not(:disabled) {
    background: #fecaca;
}

.btn-remove-winner:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.winner-fields {
    display: grid;
    grid-template-columns: 80px 1fr 1fr;
    gap: 1rem;
}

.btn-add-winner {
    background: #f0f9ff;
    color: #0369a1;
    border: 1px solid #bae6fd;
}

.btn-add-winner:hover {
    background: #bae6fd;
}

.btn-add-winner-large {
    width: 100%;
    background: #f8fafc;
    color: #64748b;
    border: 2px dashed #cbd5e1;
    padding: 1.5rem;
    font-size: 1rem;
    justify-content: center;
}

.btn-add-winner-large:hover {
    background: #f1f5f9;
    border-color: #6366f1;
    color: #6366f1;
}

/* Form Actions */
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
}

.btn-primary,
.btn-secondary,
.btn-danger {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}

.btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.btn-secondary {
    background: white;
    color: #64748b;
    border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
}

.btn-danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: white;
}

.btn-danger:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(239, 68, 68, 0.4);
}

/* Modal Styles - Matching Excel upload */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
}

.modal-content {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    animation: modalSlideIn 0.3s ease;
}

.modal-content.large {
    max-width: 700px;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
}

.close-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: #f1f5f9;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.close-btn:hover {
    background: #e2e8f0;
}

.modal-body {
    padding: 1.5rem;
}

.delete-warning {
    text-align: center;
    padding: 1rem;
}

.delete-warning i {
    font-size: 3rem;
    color: #f59e0b;
    margin-bottom: 1rem;
}

.delete-warning h4 {
    color: #1f2937;
    margin-bottom: 1rem;
}

.delete-warning p {
    color: #6b7280;
    margin-bottom: 1.5rem;
}

.award-info {
    background: #f9fafb;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.award-info strong {
    display: block;
    font-size: 1.125rem;
    color: #1f2937;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
}

/* Guide Table */
.guide-section {
    margin-bottom: 2rem;
}

.guide-section h4 {
    color: #374151;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.guide-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
}

.guide-table th,
.guide-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
}

.guide-table th {
    background: #f8fafc;
    font-weight: 600;
    color: #374151;
}

.required {
    background: #dcfce7;
    color: #166534;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
}

.optional {
    background: #f3f4f6;
    color: #6b7280;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 500;
}

/* Toast Styles - Matching Excel upload */
.toast {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    z-index: 1001;
    border-left: 4px solid;
    animation: slideInRight 0.3s ease;
}

.toast.success {
    border-left-color: #10b981;
}

.toast.error {
    border-left-color: #ef4444;
}

.toast-icon {
    font-size: 1.5rem;
}

.toast.success .toast-icon {
    color: #10b981;
}

.toast.error .toast-icon {
    color: #ef4444;
}

.toast-content h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #1e293b;
}

.toast-content p {
    color: #64748b;
    font-size: 0.875rem;
}

.toast-close {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    transition: background 0.3s ease;
}

.awards-list-section {
    position: sticky;
    top: 0px;
}

.toast-close:hover {
    background: #f1f5f9;
}

/* Animations */
@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* Responsive Design */
@media (max-width: 1024px) {
    .main-content-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .awards-list-section {
        order: 2;
    }

    .award-form-section {
        order: 1;
    }
}

@media (max-width: 768px) {
    .award-management-container {
        margin: 1rem auto;
        padding: 0 0.5rem;
    }

    .upload-header {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
        padding: 1.5rem;
    }

    .header-content {
        flex-direction: column;
        text-align: center;
    }

    .header-actions {
        flex-direction: column;
        width: 100%;
    }

    .section-header {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }

    .section-actions {
        flex-direction: column;
    }

    .search-container {
        flex: none;
    }

    .form-grid {
        grid-template-columns: 1fr;
    }

    .winner-fields {
        grid-template-columns: 1fr;
    }

    .form-actions {
        flex-direction: column;
    }

    .modal-footer {
        flex-direction: column;
    }

    .modal-content {
        margin: 1rem;
    }

    .toast {
        right: 1rem;
        left: 1rem;
        max-width: none;
    }
}

@media (max-width: 480px) {
    .award-card {
        padding: 1rem;
    }

    .btn-primary,
    .btn-secondary,
    .btn-danger {
        padding: 0.75rem 1rem;
        font-size: 0.8rem;
    }
}
</style>