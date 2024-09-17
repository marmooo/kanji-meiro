import { TextLineStream } from "jsr:@std/streams/text-line-stream";

async function build(threshold) {
  Deno.mkdirSync("src/data/idiom/2", { recursive: true });
  Deno.mkdirSync("src/data/idiom/3", { recursive: true });
  Deno.mkdirSync("src/data/ignored/2", { recursive: true });
  Deno.mkdirSync("src/data/ignored/3", { recursive: true });
  for (let i = 1; i <= 12; i++) {
    const idiom2 = [];
    const idiom3 = [];
    const ignored2 = [];
    const ignored3 = [];
    const file = await Deno.open(`graded-idioms-ja/dist/${i}.csv`);
    const lineStream = file.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TextLineStream());
    for await (const line of lineStream) {
      const arr = line.split(",");
      const word = arr[0];
      const count = parseInt(arr[1]);
      if (i <= 9) {
        if (count >= threshold) {
          switch (word.length) {
            case 2:
              idiom2.push(word);
              break;
            case 3:
              idiom3.push(word);
              break;
          }
        } else {
          switch (word.length) {
            case 2:
              ignored2.push(word);
              break;
            case 3:
              ignored3.push(word);
              break;
          }
        }
      } else {
        switch (word.length) {
          case 2:
            idiom2.push(word);
            break;
          case 3:
            idiom3.push(word);
            break;
        }
      }
    }
    Deno.writeTextFileSync(`src/data/idiom/2/${i}.lst`, idiom2.join("\n"));
    Deno.writeTextFileSync(`src/data/idiom/3/${i}.lst`, idiom3.join("\n"));
    Deno.writeTextFileSync(`src/data/ignored/2/${i}.lst`, ignored2.join("\n"));
    Deno.writeTextFileSync(`src/data/ignored/3/${i}.lst`, ignored3.join("\n"));
  }
}

const threshold = 100000;
await build(threshold);
