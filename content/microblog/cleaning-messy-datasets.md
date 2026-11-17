+++
title = "Notes on cleaning messy datasets in Pandas"
date = 2026-03-11

[taxonomies]
tags = ["Python", "Pandas"]
+++

Before training any model, 80% of the real leverage is still in inspecting missing values (`isnull().sum()`), deciding where forward/backward fill makes domain sense, and keeping transformations explicit and reproducible.
