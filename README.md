# MegatronBot - Let's Chat

MegatronBot is a fully fleged chatbot with easy to update, integrate with website, easy to deploy in any cloud services like AWS, GCP and azure with a capibility to work in production enviorment.Megatron accepts various formats of inputs you can give a text input, you can also give a Speech as a input.

## What is the need of ChatBot?

Megatron was build by the team of ineuron.ai where I have worked upon a task of Intent Classification and State Tracking.The need of the MegatronBot came as ineuron.ai has a overwhemling responses and queries asked by the student over their newly released courses, as their is a Skype Support team to clarify their queries always but they cant be available 24x7 hours due to this ineuron.ai wants to build a such a great solution where the user can clarify their queries anytime without waiting in a queue for hours.

## How I have apporached to such Solution?

Building a Megatron like ChatBot requires a huge amount of data and various state of the art components.So, the first task is to get a large data,The dataset was creatd by scaraping the queries and answers asked by students over a year to their Skype support team, the dataset include of 20k sentences which were transformed and added to CSV and json format.

I have tried many State of the art language models from BERT-large to DialoGPT to RoBERTa but got an awesome results over Distilled BERT Models with ELMO embeddings.The model then trained over the 20k queries after preprocessing then adding tokens like [SEP], [START], [END] and [EOS].
  
The Architecture of MegatronBot: -

<p align="center">
  <img width="1010" height="700" src="utils/Megatron-ChatBot@2x (1).png">
</p>


Below are some results: 

<p align = "center"><img align = "center" src = "utils/NewGIF.gif" /></p>
