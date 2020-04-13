from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

import tensorflow as tf
from tensorflow import keras

import numpy as np
import pickle
# from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences


app = Flask(__name__)
CORS(app)

# app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/api", methods=['GET', 'POST'])
def hello_world():
    response = jsonify({'some': 'data'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response
    # result = {'result': 'RETURN OK!'}
    # return jsonify(result)


def create_model():
    model = tf.keras.Sequential([
        tf.keras.layers.Embedding(20000, 300, input_length=25),
        tf.keras.layers.LSTM(units=50),
        tf.keras.layers.Dense(2, activation='softmax')
    ])

    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    return model


@app.route("/inference", methods=['POST'])
def inference():

    data = request.get_json()
    # print(data['text'])
    model = create_model()
    model.load_weights('./checkpoints/my_checkpoint')

    test_sentence = data['text']
    test_sentence = test_sentence.split(' ')
    test_sentences = []
    now_sentence = []
    for word in test_sentence:
        now_sentence.append(word)
        test_sentences.append(now_sentence[:])

    # loading
    with open('tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

        test_X_1 = tokenizer.texts_to_sequences(test_sentences)
        test_X_1 = pad_sequences(test_X_1, padding='post', maxlen=25)
        prediction = model.predict(test_X_1)
        # for idx, sentence in enumerate(test_sentences):
        # print(sentence)
        # print(prediction[idx])
        emotion = "neutral"
        positive_rate = prediction[-1][1] * 100
        if positive_rate >= 60:
            emotion = "positive"
        elif positive_rate > 40 and positive_rate < 60:
            emotion = "neutral"
        else:
            emotion = "negative"

        positive_rate = "{:.3f}".format(positive_rate)
        response = jsonify(
            {"positive_rate": positive_rate, "emotion": emotion})
        return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
