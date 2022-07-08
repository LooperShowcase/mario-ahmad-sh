kaboom({
  fullscreen: true,
  clearColor: [0.5, 0.9, 0.5, 1],
  global: true,
  scale: 2,
});

loadRoot("./sprites/");
loadSprite("ground", "block.png");
loadSprite("sp", "spongebob.png");
loadSprite("s", "coin.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("sur", "surprise.png");
loadSound("jump", "jumpSound.mp3");
loadSound("song", "gameSound.mp3");
loadSprite("pipe", "pipe_up.png");
loadSprite("drink", "mushroom.png");
loadSprite("monster", "z.png");
loadSprite("heart", "heart.png");
let score = 0;
let hearts = 3;

scene("level 1", () => {
  play("song");
  layers(["bg", "obj", "ui"], "obj");
  const map = [
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                  $                                                           ",
    "                                  =                                                           ",
    "                                  =$                                                           ",
    "                                  === $$$                                                   ",
    "       $$   $$                       ==== $$                        $$$       $ $                         ",
    "       ==?m?==  $$      $$      $$$      ===  $$              $$    ??m      ?=m=?                            ",
    "                3       3       ===           3               3                              p  ",
    "             e                                                                                ",
    "================================    ================  ====  =====  ======  =========  ==========",
  ];
  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("ground"), solid()],
    1: [sprite("sp"), solid()],
    $: [sprite("s"), "coins"],
    "?": [sprite("sur"), solid(), "surprise-coin"],
    m: [sprite("sur"), solid(), "surprise"],
    v: [sprite("unboxed"), solid()],
    3: [sprite("pipe"), solid()],
    p: [sprite("pipe"), solid(), "pipe"],
    4: [sprite("drink"), solid(), "drink", body()],
    e: [sprite("monster"), solid(), "monster", body()],
  };

  const gameLevel = addLevel(map, mapSymbols);
  const player = add([
    sprite("sp"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);

  const scoreLable = add([text("score: 0")]);
  const heartobj = add([
    sprite("heart"),
    text("       x3", 12),
    origin("center"),
  ]);

  keyDown("d", () => {
    player.move(130, 0);
  });

  keyDown("a", () => {
    player.move(-130, 0);
  });

  keyDown("w", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(400);
    }
  });

  player.on("headbump", (obj) => {
    if (obj.is("surprise-coin")) {
      destroy(obj);
      gameLevel.spawn("v", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise")) {
      destroy(obj);
      gameLevel.spawn("v", obj.gridPos);
      gameLevel.spawn("4", obj.gridPos.sub(0, 1));
    }
  });

  action("drink", (obj) => {
    obj.move(70, 0);
  });

  player.collides("coins", (obj) => {
    destroy(obj);
    score += 1;
  });

  player.collides("drink", (obj) => {
    destroy(obj);
    player.biggify(4);
  });

  player.collides("pipe", (obj) => {
    keyDown("s", () => {
      go("level 2");
    });
  });

  player.action(() => {
    camPos(player.pos);
    scoreLable.pos = player.pos.sub(400, 200);
    heartobj.pos = player.pos.sub(400, 170);
    scoreLable.text = "score: " + score;
    heartobj.text = "   x" + hearts;
    if (player.pos.y > 500) {
      go("lose");
    }
    if (hearts <= 0) {
      go("lose");
    }
  });

  action("monster", (obj) => {
    obj.move(-50, 0);
  });

  let isJumping = false;

  player.collides("monster", (obj) => {
    if (isJumping) {
      destroy(obj);
      score += 5;
    } else {
      hearts--;
    }
  });

  player.action(() => {
    isJumping = !player.grounded();
  });

  // scene end
});
scene("level 2", () => {
  play("song");
  layers(["bg", "obj", "ui"], "obj");
  const map = [
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                                                                             ",
    "                                      $$$$$$$$$$$$                                                       ",
    "                                      ============                                                       ",
    "                                   =                                                          ",
    "                                 =                                                            ",
    "                               =                                     ??                          ",
    "        m?                   =                         $$                      m              p      ",
    "                        e   =                          3                               $$$$            ",
    "================================    ================  ====  =====  ======  =========  ==========",
  ];
  const mapSymbols = {
    width: 20,
    height: 20,
    "=": [sprite("ground"), solid()],
    1: [sprite("sp"), solid()],
    $: [sprite("s"), "coins"],
    "?": [sprite("sur"), solid(), "surprise-coin"],
    m: [sprite("sur"), solid(), "surprise"],
    v: [sprite("unboxed"), solid()],
    3: [sprite("pipe"), solid()],
    p: [sprite("pipe"), solid(), "pipe"],
    4: [sprite("drink"), solid(), "drink", body()],
    e: [sprite("monster"), solid(), "monster", body()],
  };

  const gameLevel = addLevel(map, mapSymbols);
  const player = add([
    sprite("sp"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);

  const scoreLable = add([text("score: 0")]);
  const heartobj = add([
    sprite("heart"),
    text("       x3", 12),
    origin("center"),
  ]);

  keyDown("d", () => {
    player.move(130, 0);
  });

  keyDown("a", () => {
    player.move(-130, 0);
  });

  keyDown("w", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(400);
    }
  });

  player.on("headbump", (obj) => {
    if (obj.is("surprise-coin")) {
      destroy(obj);
      gameLevel.spawn("v", obj.gridPos);
      gameLevel.spawn("$", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise")) {
      destroy(obj);
      gameLevel.spawn("v", obj.gridPos);
      gameLevel.spawn("4", obj.gridPos.sub(0, 1));
    }
  });

  action("drink", (obj) => {
    obj.move(70, 0);
  });

  player.collides("coins", (obj) => {
    destroy(obj);
    score += 1;
  });

  player.collides("drink", (obj) => {
    destroy(obj);
    player.biggify(4);
  });

  player.collides("pipe", (obj) => {
    keyDown("s", () => {
      go("win ");
    });
  });

  player.action(() => {
    camPos(player.pos);
    scoreLable.pos = player.pos.sub(400, 200);
    heartobj.pos = player.pos.sub(400, 170);
    scoreLable.text = "score: " + score;
    heartobj.text = "   x" + hearts;
    if (player.pos.y > 500) {
      go("lose");
    }
    if (hearts <= 0) {
      go("lose");
    }
  });

  action("monster", (obj) => {
    obj.move(-50, 0);
  });

  let isJumping = false;

  player.collides("monster", (obj) => {
    if (isJumping) {
      destroy(obj);
      score += 5;
    } else {
      hearts--;
    }
  });

  player.action(() => {
    isJumping = !player.grounded();
  });

  // scene end
});
scene("win", () => {
  add([text("you win", 64), origin("center"), pos(width() / 2, height() / 2)]);

  keyDown("space", () => {
    go("level 1");
  });


});
scene("lose", () => {
  hearts = 3;
  add([text("you lose", 64), origin("center"), pos(width() / 2, height() / 2)]);

  keyDown("space", () => {
    go("level 1");
  });
});

start("level 1");
