import { ref } from "vue";
import axios from "axios"; // Importation directe d'Axios

export function useEventQuestionnaire() {
    const questionnaire = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const questionnaireId = ref(null); // Add a ref to store the questionnaire ID

    const fetchQuestionnaire = async (eventId) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await axios.get(`https://jpenielevent.onrender.com/events/${eventId}/questionnaire`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the token here
                }
            });
            questionnaire.value = response.data;

            //extraire le id du questionnaire dans l'api
            if (questionnaire.value && questionnaire.value.length > 0) {
                questionnaireId.value = questionnaire.value[0].id;
            }
        } catch (err) {
            error.value = err.response?.data?.detail || err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        questionnaire,
        error,
        loading,
        questionnaireId,
        fetchQuestionnaire,
    };
}