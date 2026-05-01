export function distributeIgdb(
  avg: number,
  count: number,
  buckets: number[],
  map: Map<number, number>,
  lastBuckets = 4,
) {
  if (!count || avg <= 0) return;

  const targetBuckets = buckets.slice(-lastBuckets);

  const epsilon = 0.001;

  const weights = targetBuckets.map((b) => ({
    bucket: b,
    weight: 1 / (Math.abs(avg - b) + epsilon),
  }));

  const totalWeight = weights.reduce((s, w) => s + w.weight, 0);

  let remaining = count;

  weights.forEach((w, index) => {
    const votes =
      index === weights.length - 1
        ? remaining
        : Math.round((w.weight / totalWeight) * count);

    remaining -= votes;

    map.set(w.bucket, (map.get(w.bucket) ?? 0) + votes);
  });
}
