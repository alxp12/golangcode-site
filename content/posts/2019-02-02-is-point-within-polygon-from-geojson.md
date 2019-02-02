---
title: "Is Long/Lat within Polygon from GeoJson"
author: Edd Turtle
type: post
date: 2019-02-02T09:00:00+00:00
url: /is-point-within-polygon-from-geojson
categories:
  - Uncategorized
tags:
  - point
  - long
  - lat
  - polygon
  - multipolygon
  - geojson
  - orb
  - coordinates
meta_image: 2019/point-in-geojson.png
---

This is an example of checking if a pair of long/lat coordinates lie within a polygon or multipolygon when working with geojson. It's often useful when working with geo-special data and maps to determine *if* the point your looking is within an area - or *which* area it's within.

We use the `paulmach/orb` package ([see on github](https://github.com/paulmach/orb/)), which is deep and precise library for dealing with all sorts of spacial and geometric data. To begin with we load in our geojson file, we're using [an example file](https://gist.github.com/wavded/1200773?short_path=99c1af9), into a feature collection. Then we're looping through each polygon to check if the point exists within it.

```go
package main

import (
    "fmt"
    "io/ioutil"

    "github.com/paulmach/orb"
    "github.com/paulmach/orb/geojson"
    "github.com/paulmach/orb/planar"
)

const (
    GEO_FILE = "points.geojson"
)

func main() {

    // Load in our geojson file into a feature collection
    b, _ := ioutil.ReadFile(GEO_FILE)
    featureCollection, _ := geojson.UnmarshalFeatureCollection(b)

    // Pass in the feature collection + a point of Long/Lat
    if isPointInsidePolygon(featureCollection, orb.Point{100.5, 0.5}) {
        fmt.Println("Point 1 is inside a Polygon")
    } else {
        fmt.Println("Point 1 is not found inside Polygon")
    }

    if isPointInsidePolygon(featureCollection, orb.Point{105.5, 2.5}) {
        fmt.Println("Point 2 is inside a Polygon")
    } else {
        fmt.Println("Point 2 is not found inside Polygon")
    }
}

// isPointInsidePolygon runs through the MultiPolygon and Polygons within a 
// feature collection and checks if a point (long/lat) lies within it.
func isPointInsidePolygon(fc *geojson.FeatureCollection, point orb.Point) bool {
    for _, feature := range fc.Features {
        // Try on a MultiPolygon to begin
        multiPoly, isMulti := feature.Geometry.(orb.MultiPolygon)
        if isMulti {
            if planar.MultiPolygonContains(multiPoly, point) {
                return true
            }
        } else {
            // Fallback to Polygon
            polygon, isPoly := feature.Geometry.(orb.Polygon)
            if isPoly {
                if planar.PolygonContains(polygon, point) {
                    return true
                }
            }
        }
    }
    return false
}
```

![is point within polygon](/img/2019/point-in-geojson.png)