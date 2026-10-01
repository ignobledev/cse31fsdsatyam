import sys
import time
import math
import select
import shutil
import tty
import termios


# =========================
# SETTINGS
# =========================

BODY_LENGTH = 25
SPACING = 1.8
FRAME_TIME = 0.03


# =========================
# TERMINAL
# =========================


def clear():
    print("\033[2J\033[H", end="")


def move_cursor(x, y):
    print(f"\033[{int(y)};{int(x)}H", end="")


def hide_cursor():
    print("\033[?25l", end="")


def show_cursor():
    print("\033[?25h", end="")


# =========================
# MOUSE TRACKING
# =========================


def enable_mouse():
    # SGR mouse mode
    print("\033[?1003h", end="")
    print("\033[?1006h", end="")


def disable_mouse():
    print("\033[?1003l", end="")
    print("\033[?1006l", end="")


def read_mouse(data):
    """
    Reads Kitty/terminal SGR mouse events.

    Format:

    ESC [ < button ; x ; y M
    """

    if "\x1b[<" not in data:
        return None

    try:
        part = data.split("\x1b[<", 1)[1]

        if "M" not in part:
            return None

        values = part.split("M", 1)[0].split(";")

        if len(values) != 3:
            return None

        button = int(values[0])
        x = int(values[1])
        y = int(values[2])

        return x, y

    except (ValueError, IndexError):
        return None


# =========================
# DRAWING
# =========================


def draw_char(x, y, char):
    move_cursor(x, y)
    print(char, end="")


def draw_segment(x1, y1, x2, y2):
    """
    Draw a line between two skeleton points.
    """

    dx = x2 - x1
    dy = y2 - y1

    distance = int(max(abs(dx), abs(dy)))

    if distance == 0:
        return

    for i in range(distance + 1):
        t = i / distance

        x = round(x1 + dx * t)
        y = round(y1 + dy * t)

        draw_char(x, y, "·")


# =========================
# MAIN
# =========================

width, height = shutil.get_terminal_size()

mouse_x = width // 2
mouse_y = height // 2

# Body points
body = []

for i in range(BODY_LENGTH):
    body.append([mouse_x - i * SPACING, mouse_y])


old_terminal = termios.tcgetattr(sys.stdin)


try:
    tty.setcbreak(sys.stdin)

    hide_cursor()
    enable_mouse()

    while True:
        width, height = shutil.get_terminal_size()

        # ---------------------
        # KEEP MOUSE IN SCREEN
        # ---------------------

        mouse_x = max(2, min(mouse_x, width - 2))
        mouse_y = max(2, min(mouse_y, height - 3))

        # ---------------------
        # HEAD
        # ---------------------

        body[0][0] = mouse_x
        body[0][1] = mouse_y

        # ---------------------
        # FOLLOWING BODY
        # ---------------------

        for i in range(1, BODY_LENGTH):
            previous = body[i - 1]
            current = body[i]

            dx = previous[0] - current[0]
            dy = previous[1] - current[1]

            distance = math.sqrt(dx * dx + dy * dy)

            if distance > SPACING:
                current[0] += dx / distance * (distance - SPACING)

                current[1] += dy / distance * (distance - SPACING)

        # ---------------------
        # REDRAW SCREEN
        # ---------------------

        clear()

        # ---------------------
        # SPINE
        # ---------------------

        for i in range(BODY_LENGTH - 1):
            draw_segment(body[i][0], body[i][1], body[i + 1][0], body[i + 1][1])

        # ---------------------
        # VERTEBRAE
        # ---------------------

        for i in range(BODY_LENGTH):
            x = round(body[i][0])
            y = round(body[i][1])

            draw_char(x, y, "●")

        # ---------------------
        # HEAD
        # ---------------------

        hx = round(body[0][0])
        hy = round(body[0][1])

        draw_char(hx, hy, "◉")

        # ---------------------
        # TAIL
        # ---------------------

        tx = round(body[-1][0])
        ty = round(body[-1][1])

        draw_char(tx, ty, "◆")

        # ---------------------
        # INFORMATION
        # ---------------------

        move_cursor(2, height - 1)

        print("SKELETON SNAKE | Move mouse | Ctrl+C = exit", end="")

        sys.stdout.flush()

        # ---------------------
        # WAIT FOR INPUT
        # ---------------------

        ready, _, _ = select.select([sys.stdin], [], [], FRAME_TIME)

        if ready:
            data = sys.stdin.read(256)

            position = read_mouse(data)

            if position:
                mouse_x, mouse_y = position


except KeyboardInterrupt:
    pass


finally:
    disable_mouse()
    show_cursor()

    termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_terminal)

    clear()
