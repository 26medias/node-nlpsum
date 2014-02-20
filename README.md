# nlpsum #

A set of text summarization algorithms, based on various reseach papers and theories.

For each of the algorithms, you indicate how many sentences it should return.

### To run the test: ###
run `node test.js` and the summaries and debug data will be written into the `/output` folder.

It will summarize the texts from example-01.txt, example-02.txt, example-03.txt and example-04.txt, using the 4 available algorithms.


## Algorithms ##
For the demo, I used the following article:

[Master monkey's brain controls sedated 'avatar'](http://www.bbc.co.uk/news/health-26224813)

### Fractal ###
Inspired by the paper "Fractal Summarization: Summarization Based on Fractal Theory" by Christopher C. Yang & Fu Lee Wang. (included in `/research papers`)

It's optimized to summarize texts containing many paragraphs (separated by \r\n\r\n), each containing several sentences.

```
    var nlpsum      = require('nlpsum').main;
    var sum         = new nlpsum();
    var summary     = sum.fractalSummary(content, 6);   // output 6 sentences
    // output the summary, as a string
``` 

#### Output ####
```
The brain of one monkey has been used to control the movements of another, "avatar", monkey, US scientists report..
Brain scans read the master monkey's mind and were used to electrically stimulate the avatar's spinal cord, resulting in controlled movement..
Damage to the spinal cord can stop the flow of information from the brain to the body, leaving people unable to walk or feed themselves..
The scientists at Harvard Medical School said they could not justify paralysing a monkey.Instead, two were used - a master monkey and a sedated avatar..
The avatar had 36 electrodes implanted in the spinal cord and tests were performed to see how stimulating different combinations of electrodes affected movement..
The two monkeys were then hooked up so that the brain scans in one controlled movements in real time in the other.
```


### Word Frequency ###
A basic algorithm that selects sentences based on the sum of their words' weights relative to the document.

This algorithm doesn't care about paragraphs, and will work with most texts and articles.

```
    var nlpsum      = require('nlpsum').main;
    var sum         = new nlpsum();
    var summary     = sum.wordFrequencySummary(content, 6);   // output 6 sentences
    // output the summary, as a string
``` 

#### Output ####
```
The brain of one monkey has been used to control the movements of another, "avatar", monkey, US scientists report.
Brain scans read the master monkey's mind and were used to electrically stimulate the avatar's spinal cord, resulting in controlled movement.
The scientists at Harvard Medical School said they could not justify paralysing a monkey.Instead, two were used - a master monkey and a sedated avatar.
The avatar had 36 electrodes implanted in the spinal cord and tests were performed to see how stimulating different combinations of electrodes affected movement.
The two monkeys were then hooked up so that the brain scans in one controlled movements in real time in the other.
```




### Sin Transform Frequency ###
An update of the Word Frequency algorithm, that gives more weight to the beginning and end of the text, and less weight to the center.

This algorithm works best for scientific papers and articles based around an introduction and conclusion.


```
    var nlpsum      = require('nlpsum').main;
    var sum         = new nlpsum();
    var summary     = sum.sinFrequencySummary(content, 6);   // output 6 sentences
    // output the summary, as a string
``` 

#### Output ####
```
The brain of one monkey has been used to control the movements of another, "avatar", monkey, US scientists report.
Brain scans read the master monkey's mind and were used to electrically stimulate the avatar's spinal cord, resulting in controlled movement.
The scientists at Harvard Medical School said they could not justify paralysing a monkey.Instead, two were used - a master monkey and a sedated avatar.
The avatar had 36 electrodes implanted in the spinal cord and tests were performed to see how stimulating different combinations of electrodes affected movement.
The two monkeys were then hooked up so that the brain scans in one controlled movements in real time in the other.
```






### Sin Transform Word Frequency ###
An update of the Sin Transform Frequency algorithm, that gives more weight to the words located at the beginning and end of the text, and less weight to the words in the middle.
This weight is compounded everytime the word is found, witht he value based on its location.
As a result, the algorithm is able to better grasp the main subject of the text, without requiring any machine learning.

This algorithm works well on any kind of text.


```
    var nlpsum      = require('nlpsum').main;
    var sum         = new nlpsum();
    var summary     = sum.sinWordFrequencySummary(content, 6);   // output 6 sentences
    // output the summary, as a string
``` 

#### Output ####
```
The brain of one monkey has been used to control the movements of another, "avatar", monkey, US scientists report.
Brain scans read the master monkey's mind and were used to electrically stimulate the avatar's spinal cord, resulting in controlled movement.
The scientists at Harvard Medical School said they could not justify paralysing a monkey.Instead, two were used - a master monkey and a sedated avatar.
The avatar had 36 electrodes implanted in the spinal cord and tests were performed to see how stimulating different combinations of electrodes affected movement.
In 98% of tests, the master could correctly control the avatar's arm.
```




# License: MIT #
Copyright (c) 2014 Julien Loutre, Twenty-Six Medias, Inc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.