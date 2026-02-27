import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  // Hardcoded 2 questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "Which language is used with React Native?",
      options: ["Python", "Java", "JavaScript", "C++"],
      answer: "JavaScript",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSubmit = () => {
    if (selected !== null) {
      if (selected === questions[current].answer) {
        setScore(score + 1);
      }
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const getMessage = () => {
    const percent = (score / questions.length) * 100;
    if (percent >= 80) return "🎉 Hurray! Well done!";
    if (percent >= 40) return "🙂 Good effort!";
    return "😔 Oh no! Time to learn more.";
  };

 if (quizComplete) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.result}>
        You got {score} out of {questions.length} correct!
      </Text>
      <Text style={styles.message}>{getMessage()}</Text>

      {/* ✅ Restart Quiz Button (same style as Submit) */}
      <TouchableOpacity
        style={[styles.button,{ marginTop: 80 }]}
        onPress={() => {
          setCurrent(0);
          setScore(0);
          setQuizComplete(false);
          setSelected(null);
          setShowAnswer(false);
        }}
      >
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flashcard Quiz</Text>

      <View style={styles.card}>
        {!showAnswer ? (
          <>
            <Text style={styles.question}>{questions[current].question}</Text>
            {questions[current].options.map((opt, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.option,
                  selected === opt && styles.selectedOption,
                ]}
                onPress={() => setSelected(opt)}
              >
                <Text>{opt}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
              Question {current + 1} of {questions.length}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.answerText}>
              Your Answer: {selected || "None"}
            </Text>
            <Text style={styles.answerText}>
              Correct Answer: {questions[current].answer}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>
                {current + 1 === questions.length
                  ? "Complete Quiz"
                  : "Next Question"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: 320,
    minHeight: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    elevation: 5,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "500",
  },
  option: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
  },
  selectedOption: {
    backgroundColor: "#d0ebff",
    borderColor: "#007AFF",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  footer: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  answerText: {
    fontSize: 18,
    marginVertical: 10,
  },
  result: {
    fontSize: 22,
    marginVertical: 12,
  },
  message: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
});
