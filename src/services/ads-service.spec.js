import {getMiddleTextAd, getHomeMiddleTextAd, getSideAd, getTopAd, getHomeTopAd, randomPickAds} from './ads-service'

describe("testing Ads Service", function() {

    it('Test if randomPickAds returns array even with invalid parameters', function() {
        const result = randomPickAds([1,2,3])
        expect(Array.isArray(result)).toBe(true)
    })

    it("Testing if randomPickAds return the right amount", function() {

        const expectedAmount = 3;
        const paramsToBeTested = [{id:1, position: 0},{id:2, position: 0},{id:3, position: 1},{id:4, position: 1},{id:5, position: 2},{id:6, position: 2},{id:7, position: 2}]
        const choosenAds = randomPickAds(paramsToBeTested)
        expect(choosenAds.length).toEqual(expectedAmount)
    })

    it("Testing if randomPickAds return uniques positions", function() {

        const expectedAmount = 3;
        const paramsToBeTested = [{id:1, position: 0},{id:11, position: 0},{id:11, position: 0},{id:12, position: 1},{id:2, position: 0},{id:3, position: 1},{id:4, position: 1},{id:5, position: 2},{id:6, position: 2},{id:7, position: 2}]

        const choosenAds = randomPickAds(paramsToBeTested)

        const positionsList = choosenAds.map(ad => ad.position)
        const duplicated = positionsList.filter((position, index) => positionsList.indexOf(position) === index)

        expect(duplicated.length).toEqual(expectedAmount)
    })

    it("Must return array size equivalent a 1", function() {

        const expectedAmount = 1;
        const paramsToBeTested = [
            {id:1, position: 0},
            {id:11, position: 0}
        ]

        const choosenAds = randomPickAds(paramsToBeTested)
        expect(choosenAds.length).toEqual(expectedAmount)
    })

    it("All json ad returned should have a property position", function() {

        const expectedResponse = true;
        const paramsToBeTested = [{id:1, position: 0},{id:11, position: 0},{id:12, position: 0}]

        const choosenAds = randomPickAds(paramsToBeTested)
        choosenAds.forEach(item => {
            expect(Object.keys(item).includes('position')).toBe(expectedResponse)
        })
    })

    it("All json ad returned should have a property id", function() {

        const expectedResponse = true;
        const paramsToBeTested = [{id:1, position: 0},{id:11, position: 0},{id:12, position: 0}]

        const paramsToBeTested1 = [{id:1, position: 1},{id:11, position: 1},{id:12, position: 1}]

        const paramsToBeTested2 = [{id:1, position: 2},{id:11, position: 2},{id:12, position: 2}]   

        const choosenAds = randomPickAds(paramsToBeTested)
        
        choosenAds.forEach(item => {
            expect(Object.keys(item).includes('id')).toBe(expectedResponse)
        })

        const choosenAds1 = randomPickAds(paramsToBeTested1)
        choosenAds1.forEach(item => {
            expect(Object.keys(item).includes('id')).toBe(expectedResponse)
        })

        const choosenAds2 = randomPickAds(paramsToBeTested2)
        choosenAds2.forEach(item => {
            expect(Object.keys(item).includes('id')).toBe(expectedResponse)
        })
    })


    it('Function to get Top Ad', function() {
        const expectedId = 3;
        const purposeBody = [{id: 1,position: 2,home: 1},{id: 2,position: 1,home: 0},{id: 3,position: 0,home: 1}]
        const response = getTopAd(purposeBody)
        expect(response.id).toEqual(expectedId)
    });

    it('Function to get Top Home Ad', function() {
        const expectedId = 3;
        const purposeBody = [{id: 1,position: 2,home: 1},{id: 2,position: 1,home: 0},{id: 3,position: 0,home: 1},{id: 10,position: 0,home: 0}]
        const response = getHomeTopAd(purposeBody)
        expect(response.id).toEqual(expectedId)
    });

    it('Function to get Middle Text Ad', function() {
        const expectedId = 2;
        const purposeBody = [{id: 1,position: 2,home: 1},{id: 2,position: 1,home: 0},{id: 3,position: 0,home: 1},{id: 10,position: 0,home: 0}]
        const response = getMiddleTextAd(purposeBody)
        expect(response.id).toEqual(expectedId)
    });

    it('Function to get Home Middle Text Ad', function() {
        const expectedId = 12;
        const purposeBody = [{id: 1,position: 2,home: 1},{id: 2,position: 1,home: 0},{id: 3,position: 0,home: 1},{id: 10,position: 0,home: 0}, {id: 12,position: 1,home: 1}]
        const response = getHomeMiddleTextAd(purposeBody)
        expect(response.id).toEqual(expectedId)
    });

    it('Function to get Side Ad', function() {
        const expectedId = 1;
        const purposeBody = [{id: 1,position: 2,home: 1},{id: 2,position: 1,home: 0},{id: 3,position: 0,home: 1},{id: 10,position: 0,home: 0}]
        const response = getSideAd(purposeBody)
        expect(response.id).toEqual(expectedId)
    });
})