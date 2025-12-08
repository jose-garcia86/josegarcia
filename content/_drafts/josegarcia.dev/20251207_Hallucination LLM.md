# Hallucination in LLMs

Hallucination is when a LLM confidently generates information that is incorrect, fabricated, or not grounded in its training data or provided context. Essentially, the model “makes things up” while presenting it as a fact.

## Why Hallucinations Happen

Language models are prediction engines - they generate text by predicting what words are likely to come next based on patterns. Sometimes this prediction process produces plausible-sounding but completely false information, especially when:

- The model doesn't actually know something but tries to answer anyway
- The question is ambiguous or requires specific knowledge the model lacks
- The model picks up on patterns that don't reflect reality

## Types of Hallucinations

**Factual hallucinations**: Making up false facts

- Inventing publication dates for books that don't exist
- Creating fake statistics or historical events
- Attributing quotes to people who never said them

**Source hallucinations**: Citing sources that don't exist

- Referencing non-existent research papers with convincing-sounding titles
- Making up URLs or article authors
- Claiming "According to a 2023 study..." when no such study exists

**Contextual hallucinations**: Misrepresenting provided information

- When given a document, claiming it says something it doesn't
- Adding details that weren't in the source material