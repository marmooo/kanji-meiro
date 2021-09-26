Deno.mkdirSync("src/data/idiom/2", { recursive: true });
Deno.mkdirSync("src/data/idiom/3", { recursive: true });
Deno.mkdirSync("src/data/ignored/2", { recursive: true });
Deno.mkdirSync("src/data/ignored/3", { recursive: true });

for (let i = 1; i <= 10; i++) {
  Deno.copyFile(
    "ngram-idioms/kanji-2-10000/" + i + ".lst",
    "src/data/idiom/2/" + i + ".lst",
  );
  Deno.copyFile(
    "ngram-idioms/kanji-3-5000/" + i + ".lst",
    "src/data/idiom/3/" + i + ".lst",
  );
}

for (let i = 1; i <= 10; i++) {
  const problemText = await Deno.readTextFile(
    "ngram-idioms/kanji-2-10000/" + i + ".lst",
  );
  const tmpText = await Deno.readTextFile(
    "ngram-idioms/kanji-2-all/" + i + ".lst",
  );
  const problem = problemText.split("\n");
  const tmp = tmpText.split("\n");
  const ignored = tmp.slice(problem.length - 1);
  Deno.writeTextFile("src/data/ignored/2/" + i + ".lst", ignored.join("\n"));
}

for (let i = 1; i <= 10; i++) {
  const problemText = await Deno.readTextFile(
    "ngram-idioms/kanji-3-5000/" + i + ".lst",
  );
  const tmpText = await Deno.readTextFile(
    "ngram-idioms/kanji-3-all/" + i + ".lst",
  );
  const problem = problemText.split("\n");
  const tmp = tmpText.split("\n");
  const ignored = tmp.slice(problem.length - 1);
  Deno.writeTextFile("src/data/ignored/3/" + i + ".lst", ignored.join("\n"));
}
