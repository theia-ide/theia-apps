#![warn(clippy::all)]
// pretty.rs
const COLORS: [&'static str;7] =
  ["red", "yellow", "pink", "green", "purple", "orange", "blue"];
struct Label {
    index: usize,
    color: &'static str
}
fn main() {
    let mut my_label = Label { index: 2, color: "blue"};
    my_label.index = 2;
    my_label.color = "a_color";

    // create a Vec of Label
    let labels: Vec<Label> = (0..10).map(|i| {
        Label { index: i, color: COLORS[i % COLORS.len()] }
      }).collect();
    // print them
    for label in labels {
        println!("{}: {}", label.index, label.color);
    }
}