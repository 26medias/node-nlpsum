# nlpsum #

A set of text summarization algorithms, based on various reseach papers and theories.

For each of the algorithms, you indicate how many sentences it should return.

### To run the test: ###
Paste your aticle in `example.txt`, run `node test.js` and the summaries and debug data will be written into the `/output` folder.


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

This algorithm works best for scentific papers and articles based around an introduction and conclusion.


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

