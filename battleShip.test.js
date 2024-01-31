import { g, Gameboard } from "./battleShip";
import { p1gmb, computer } from "./gameBoardUi";
test("placed ship at gameboard", () => {
  expect(g.placeShip({ length: 4, place: "vertical" }, 3, 7).has("3,7")).toBe(
    true,
  );
});

test("recieve attack", () => {
  expect(g.receiveAttack(4, 7)).toBe("hit");
  expect(g.receiveAttack(6, 7)).toBe("hit");
});

test.skip("reveal attacked ship", () => {
  expect(g.revealAttackedShip("4").id).toBe("4");
});
//first each of them should place their ships accordingly
//after that attack is easy
test("computer place ship ", () => {
  expect(
    computer.placeShip({ length: 2, place: "horizontanl" }, 4, 6).has("4,7"),
  ).toBe(true);
});
test("player 1 attack test on computer", () => {
  expect(computer.receiveAttack(4, 6)).toBe("hit");
});
// test('player 1 sinked?')
