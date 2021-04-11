import ktrain
import numpy as np


class DistilBERT_Model:

    def model_pred(self,message):
        print("loading model")
        reloaded_predictor = ktrain.load_predictor('model/distilbert_model_40Epochs')
        print("predicting..")

        result=reloaded_predictor.predict(message)
        results=[result,'ticket_gen']
        predicts=reloaded_predictor.predict_proba(message)
        print("prediction done")
        # results = self.decode(le,predicts)
        sp = np.max(predicts)
        cs=round(sp, 6)*100
        print('Confidence Score : '+str(cs)+"%")

        response = [cs,results]
        return response
        # return results

