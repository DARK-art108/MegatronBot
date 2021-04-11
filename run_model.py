import tensorflow as tf
import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
import tensorflow_hub as hub
import numpy as np
from sklearn import preprocessing
from keras.layers import Input, Lambda, Dense
from keras.models import Model,load_model
import keras.backend as K
from api_file import Sent_Generation


class ELMo_Model:

    def decode(self,le, one_hot):
        dec = np.argmax(one_hot, axis=1)
        return le.inverse_transform(dec)

    def ELMoEmbedding(self,x):
        elmo = hub.Module("model/elmo_3", trainable=True)
        # elmo = hub.Module("https://tfhub.dev/google/elmo/3", trainable=True)
        return elmo(tf.squeeze(tf.cast(x, tf.string)), signature="default", as_dict=True)["default"]

    def model_pred(self,message):
        le = preprocessing.LabelEncoder()
        le.classes_ = np.load('model/classes.npy')

        input_text = Input(shape=(1,), dtype=tf.string)
        embedding = Lambda(self.ELMoEmbedding, output_shape=(1024,))(input_text)
        dense = Dense(256, activation='relu')(embedding)
        pred = Dense(2, activation='softmax')(dense)
        model = Model(inputs=[input_text], outputs=pred)
        # model.compile(loss='categorical_crossentropy',optimizer='adam',metrics=['accuracy'])
        testing_list = []
        testing_list.append(message)
        testing_list.append('')
        print(testing_list)
        pred_test = np.array(testing_list)
        with tf.Session() as session:
            K.set_session(session)
            session.run(tf.global_variables_initializer())
            session.run(tf.tables_initializer())
            print("loading model")
            model.load_weights('model/elmo_intent_model.h5')
            # predicts = model.predict(x_test,batch_size=32)
            print("predicting..")
            predicts = model.predict(pred_test)
            print("prediction done")
            results = self.decode(le,predicts)

            sp = np.max(predicts[0])
            cs=round(sp, 6)*100
            print('Confidence Score : '+str(cs)+"%")
            if sp > 0.50:
                response = [cs,results]

            elif sp > 0.4:
                response = [cs,results]

            else:
                response = [cs,results]
        return response
        # return results

