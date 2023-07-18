import sys
import json
import math
from PIL import Image, ImageDraw, ImageOps

SIZE=400
STANCE=20.0
CENTER_POINTS=[]
RIGHT_POINTS=[]
LEFT_POINTS=[]

def draw_vector(start, length, angle):
    """ Draw a Vector, Return New Vector """
    radians = math.radians(start[2] + angle)
    dy = length * math.cos(radians)
    dx = length * math.sin(radians)
    end = (start[0] + dx, start[1] + dy, math.degrees(radians))
    CENTER_POINTS.append(end)

    dy = STANCE/2 * math.cos(radians - math.radians(90))
    dx = STANCE/2 * math.sin(radians - math.radians(90))
    RIGHT_POINTS.append((end[0] + dx, end[1] + dy, math.degrees(radians)))

    dy = STANCE/2 * math.cos(radians + math.radians(90))
    dx = STANCE/2 * math.sin(radians + math.radians(90))
    LEFT_POINTS.append((end[0] + dx, end[1] + dy, math.degrees(radians)))
    return end

def draw_tangent(coord, length):
    """ Draw a straight line """
    i = 0.0
    distance = 1.0
    while i < length:
        coord = draw_vector(coord, distance, 0)
        i += distance
    return coord

def draw_arc(coord, radius, degrees):
    """ Draw an arced line """
    i = 0.0
    arc = 1.0
    distance = arc * 2*radius*math.pi / 360.0
    if degrees > 0:
        while i < degrees:
            coord = draw_vector(coord, distance, arc)
            i += arc 
    else:
        while i > degrees:
            coord = draw_vector(coord, distance, -arc)
            i -= arc 
    return coord


def main():

    with open(sys.argv[1]) as infile:
        for line in infile:
            items = line.strip().split(" ")
            if items[0] == "s":
                # Starting Point
                coord = (int(items[1]), int(items[2]), int(items[3]))
                CENTER_POINTS.append(coord)
                RIGHT_POINTS.append((coord[0] - STANCE/2, coord[1], 0))
                LEFT_POINTS.append((coord[0] + STANCE/2, coord[1], 0))
            elif items[0] == "rf":
                # Right Footer
                coord = draw_arc(coord, int(items[1]), int(items[2]))
            elif items[0] == "lf":
                # Left Footer
                coord = draw_arc(coord, int(items[1]), -int(items[2]))
            elif items[0] == "t":
                # Tangent
                coord = draw_tangent(coord, int(items[1]))

    max_x = max_y = 0
    min_x = min_y = 999999
    for i in range(len(RIGHT_POINTS)):
        max_x = max(max_x, RIGHT_POINTS[i][0], LEFT_POINTS[i][0])
        min_x = min(min_x, RIGHT_POINTS[i][0], LEFT_POINTS[i][0])
        max_y = max(max_y, RIGHT_POINTS[i][1], LEFT_POINTS[i][1])
        min_y = min(min_y, RIGHT_POINTS[i][1], LEFT_POINTS[i][1])

    # Image
    im = Image.new("RGB", (int(max_x-min_x)+20, int(max_y-min_y)+20), "white")
    draw = ImageDraw.Draw(im)

    for i in range(len(RIGHT_POINTS)):
        if i != 0:
            #draw.line([(CENTER_POINTS[i-1][0], CENTER_POINTS[i-1][1]), (CENTER_POINTS[i][0], CENTER_POINTS[i][1])], fill='black', width=1)
            angle1 = CENTER_POINTS[i-1][2]
            angle2 = CENTER_POINTS[i][2]
            if angle1 < angle2:
                rwidth = 8
                lwidth = 1
            elif angle1 > angle2:
                rwidth = 1
                lwidth = 8
            else:
                rwidth = 1
                lwidth = 1
            draw.line([(RIGHT_POINTS[i-1][0]-min_x+10, RIGHT_POINTS[i-1][1]-min_y+10), (RIGHT_POINTS[i][0]-min_x+10, RIGHT_POINTS[i][1]-min_y+10)], fill='black', width=rwidth)
            draw.line([(LEFT_POINTS[i-1][0]-min_x+10, LEFT_POINTS[i-1][1]-min_y+10), (LEFT_POINTS[i][0]-min_x+10, LEFT_POINTS[i][1]-min_y+10)], fill='black', width=lwidth)


    im.save("test.png")

if __name__ == "__main__":
    main()
